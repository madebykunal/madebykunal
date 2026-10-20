export function Mark({ size, color }: { size: number; color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 78 78"
      width={size}
      height={size}
      fill={color}
      aria-hidden="true"
    >
      <polygon points="39,11.5 51,23.5 39,35.5 27,23.5" />
      <rect x="2" y="27.5" width="16" height="16" />
      <rect x="60" y="27.5" width="16" height="16" />
      <rect x="37" y="31.5" width="4" height="31" />
      <polygon points="12,39.5 39,66.5 66,39.5 64.34,35.5 39,60.84 13.66,35.5" />
    </svg>
  );
}
