type BrushUnderlineProps = {
  children: React.ReactNode;
};

export function BrushUnderline({ children }: BrushUnderlineProps) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="absolute left-0 -bottom-1 w-full h-2"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2,5 Q25,1 50,4 T98,3"
          stroke="#C8473C"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
