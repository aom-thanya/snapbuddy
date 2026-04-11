export default function StarRow({ value, onChange, size = 32 }) {
  return (
    <div className="flex gap-1 justify-center">
      {[1,2,3,4,5].map((n) => (
        <button key={n} onClick={() => onChange(n)}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill={n <= value ? "#f59e0b" : "none"} stroke={n <= value ? "#f59e0b" : "#d6d3d1"} strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
