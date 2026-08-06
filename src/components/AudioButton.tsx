import { isSpeechSupported, speakJapanese } from '../features/audio/speech';

const SIZES = {
  sm: { button: 'h-6 w-6', icon: 14 },
  md: { button: 'h-8 w-8', icon: 18 },
};

export default function AudioButton({ text, size = 'md' }: { text: string; size?: keyof typeof SIZES }) {
  if (!isSpeechSupported()) return null;

  const { button, icon } = SIZES[size];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speakJapanese(text);
      }}
      className={`inline-flex ${button} shrink-0 items-center justify-center rounded-full text-indigo transition-colors hover:bg-indigo/10`}
      aria-label={`Ouvir pronúncia de ${text}`}
      title="Ouvir pronúncia"
    >
      <svg
        viewBox="0 0 24 24"
        width={icon}
        height={icon}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M18.36 5.64a9 9 0 0 1 0 12.73" />
      </svg>
    </button>
  );
}
