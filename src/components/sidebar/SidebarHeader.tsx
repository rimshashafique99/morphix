import Image from "next/image";

export function SidebarHeader() {
  return (
    <div className="flex items-center gap-2 rounded-[8px] p-2">
      <Image
        src="/brand/logo.png"
        alt="Morphix logo"
        width={53}
        height={50}
        className="h-[50px] w-[53px] shrink-0 object-contain"
        priority
      />
      <div className="flex min-w-0 flex-col gap-1 leading-none">
        <p className="truncate text-sm font-semibold text-sidebar-foreground">
          Morphix - 3D
        </p>
        <p className="truncate text-xs text-muted-500">
          Created by Muhammad Noman
        </p>
      </div>
    </div>
  );
}
