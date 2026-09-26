import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const DURATION_MS = 10000;
const SPARKLE_COUNT = 28;

interface Sparkle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

interface CriticalSparklesProps {
  onDone: () => void;
}

export function CriticalSparkles({ onDone }: CriticalSparklesProps) {
  const [visible, setVisible] = useState(true);
  const [sparkles] = useState<Sparkle[]>(() =>
    Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
    }))
  );

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), DURATION_MS - 400);
    const doneTimer = setTimeout(onDone, DURATION_MS);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(232, 199, 126, 0.25), transparent 70%)',
          animation: 'glow-pulse 2.5s ease-in-out infinite',
        }}
      />
      {sparkles.map((s) => (
        <Sparkles
          key={s.id}
          className="absolute text-gold-bright"
          style={{
            left: `${s.left}%`,
            top: '-5vh',
            width: s.size,
            height: s.size,
            animation: `sparkle-fall ${s.duration}s linear ${s.delay}s infinite`,
            filter: 'drop-shadow(0 0 4px rgba(232, 199, 126, 0.8))',
          }}
        />
      ))}
    </div>
  );
}
