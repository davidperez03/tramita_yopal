export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Tramita Yopal"
    >
      <rect width="36" height="36" rx="10" fill="#312e81" />
      <path d="M10 20V17C10 17 12 12 18 12C24 12 26 17 26 17V20H10Z" fill="#f59e0b" />
      <rect x="8" y="20" width="20" height="5" rx="1.5" fill="#f59e0b" />
      <path d="M12.5 17C12.5 17 13.5 14.5 18 14.5C22.5 14.5 23.5 17 23.5 17H12.5Z" fill="#1e1b4b" />
      <circle cx="12.5" cy="25" r="3.5" fill="#1e1b4b" />
      <circle cx="12.5" cy="25" r="1.8" fill="#f59e0b" />
      <circle cx="12.5" cy="25" r="0.7" fill="#1e1b4b" />
      <circle cx="23.5" cy="25" r="3.5" fill="#1e1b4b" />
      <circle cx="23.5" cy="25" r="1.8" fill="#f59e0b" />
      <circle cx="23.5" cy="25" r="0.7" fill="#1e1b4b" />
      <circle cx="28" cy="8" r="5" fill="#4338ca" />
      <path d="M25.5 8L27.2 9.8L30.5 6.5" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
