import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: true,
  // Отключаем Link-заголовок от middleware: он ставил x-default на корень (/),
  // из-за чего Яндекс считал canonical для /ru равным /. Альтернаты задаём в layout (canonical + x-default: /ru).
  alternateLinks: false,
});
