import Image from "next/image";

export function UpgradeCard() {
  return (
    <div className="sidebar-footer-glow absolute inset-x-[-1px] bottom-[-1px] rounded-[24px] bg-white p-2">
      <div className="flex items-center gap-2 rounded-[8px] p-2">
        <Image
          src="/brand/upgrade.png"
          alt=""
          width={52}
          height={52}
          className="size-[52px] shrink-0 rounded-[10px] object-cover"
        />
        <div className="flex min-w-0 flex-col gap-1 leading-none">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            Upgrade to Pro
          </p>
          <p className="truncate text-xs text-muted-500">Coming Soon !</p>
        </div>
      </div>
    </div>
  );
}
