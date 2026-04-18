interface CircleArrowProps {
  className?: string;
  size?: number;
}

export function CircleArrow({ className = '', size = 80 }: CircleArrowProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="50" cy="50" r="42" />
      <path d="M30 60 L65 35" />
      <path d="M45 33 L65 35 L63 55" />
    </svg>
  );
}
