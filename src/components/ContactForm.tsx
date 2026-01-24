'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { DURATION, DELAY } from '@/lib/animations';

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'validation';

export function ContactForm() {
  const t = useTranslations('contactForm');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    message: '',
  });

  const hasContact = formData.email.trim() || formData.telegram.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasContact) {
      setStatus('validation');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', telegram: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: DURATION.slow }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent text-center"
      >
        {t('title')}
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: DURATION.normal, delay: DELAY.stagger }}
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl bg-card/80 border border-border/50 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
            placeholder={t('namePlaceholder')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('email')} <span className="text-muted-foreground font-normal">({t('optional')})</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-4 py-3 rounded-xl bg-card/80 border border-border/50 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
              placeholder={t('emailPlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="telegram" className="block text-sm font-medium mb-2">
              Telegram <span className="text-muted-foreground font-normal">({t('optional')})</span>
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-4 py-3 rounded-xl bg-card/80 border border-border/50 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-50"
              placeholder="@username"
            />
          </div>
        </div>

        {status === 'validation' && (
          <p className="text-sm text-amber-500">{t('contactRequired')}</p>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-card/80 border border-border/50 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none disabled:opacity-50"
            placeholder={t('messagePlaceholder')}
          />
        </div>

        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          whileHover={status === 'idle' || status === 'validation' ? { scale: 1.02 } : {}}
          whileTap={status === 'idle' || status === 'validation' ? { scale: 0.98 } : {}}
          className={`
            w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
            ${
              status === 'success'
                ? 'bg-emerald-500 text-white'
                : status === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90'
            }
            disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer
          `}
        >
          {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === 'success' && <CheckCircle className="w-5 h-5" />}
          {status === 'error' && <AlertCircle className="w-5 h-5" />}
          {(status === 'idle' || status === 'validation') && <Send className="w-5 h-5" />}
          {status === 'loading' && t('sending')}
          {status === 'success' && t('sent')}
          {status === 'error' && t('error')}
          {(status === 'idle' || status === 'validation') && t('send')}
        </motion.button>
      </motion.form>
    </section>
  );
}
