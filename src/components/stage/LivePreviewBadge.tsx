export function LivePreviewBadge() {
  return (
    <div className="absolute left-8 top-6 z-10 flex items-center gap-2 rounded-[12px] border border-line bg-white p-3 shadow-[4px_8px_4.5px_rgba(0,0,0,0.03),1px_2px_2.5px_rgba(0,0,0,0.03)]">
      <span className="size-2.5 rounded-full bg-live-dot" />
      <span className="text-xs font-medium text-[#333]">Live Preview</span>
    </div>
  );
}
