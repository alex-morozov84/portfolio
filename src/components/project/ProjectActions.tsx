'use client';

import { useTranslations } from 'next-intl';
import { ActionButton } from '@/components/ui/ActionButton';

interface ProjectActionsProps {
  demoUrl?: string;
  liveUrl?: string;
  onDetailsClick?: () => void;
  onBackClick?: () => void;
  showDetails?: boolean;
  showBack?: boolean;
}

export function ProjectActions({
  demoUrl,
  liveUrl,
  onDetailsClick,
  onBackClick,
  showDetails = false,
  showBack = false,
}: ProjectActionsProps) {
  const t = useTranslations('projects');

  return (
    <div className="flex gap-2">
      {demoUrl && (
        <ActionButton href={demoUrl} variant="primary" icon="demo" external className="flex-1">
          {t('viewDemo')}
        </ActionButton>
      )}

      {liveUrl && (
        <ActionButton href={liveUrl} variant="secondary" icon="live" external>
          {t('viewLive')}
        </ActionButton>
      )}

      {showDetails && (
        <ActionButton onClick={onDetailsClick} variant="ghost" icon="details">
          {t('details')}
        </ActionButton>
      )}

      {showBack && (
        <ActionButton onClick={onBackClick} variant="ghost" icon="back">
          {t('back')}
        </ActionButton>
      )}
    </div>
  );
}
