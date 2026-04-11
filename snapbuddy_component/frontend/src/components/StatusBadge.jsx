export default function StatusBadge({ tone, children }) {
  const cls = tone === "amber" ? "bg-amber-100 text-amber-700" : tone === "green" ? "bg-green-100 text-green-700" : "bg-stone-200 text-stone-600";
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cls}`}>{children}</span>;
}
