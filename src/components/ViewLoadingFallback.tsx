export default function ViewLoadingFallback() {
  return (
    <div className="relative z-10 flex min-h-[50vh] items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1E3A8A]/35 border-t-[#CC2936]" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">Loading page</p>
      </div>
    </div>
  );
}
