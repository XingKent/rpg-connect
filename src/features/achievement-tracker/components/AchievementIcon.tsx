import { Trophy } from 'lucide-react';

interface AchievementIconProps {
  image?: string;
  name: string;
  unlocked: boolean;
}

export function AchievementIcon({ image, name, unlocked }: AchievementIconProps) {
  return (
    <span
      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-sm border ${
        unlocked ? 'border-gold-bright bg-surface-raised' : 'border-border-ember bg-surface-inset'
      }`}
    >
      {image ? (
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : (
        <Trophy size={20} className={unlocked ? 'text-gold-bright' : 'text-ink-faint'} />
      )}
    </span>
  );
}
