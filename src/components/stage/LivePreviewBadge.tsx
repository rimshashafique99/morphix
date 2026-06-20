export function LivePreviewBadge() {
  return (
    <div className="group absolute left-8 top-6 z-10 flex items-center gap-2 rounded-[12px] border border-line bg-white p-3 shadow-[4px_8px_4.5px_rgba(0,0,0,0.03),1px_2px_2.5px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <span className="size-2.5 rounded-full bg-live-dot transition-transform duration-200 group-hover:scale-125" />
      <span className="text-xs font-medium text-[#333]">Live Preview</span>
    </div>
  );
}
