import Image from "next/image";

/**
 * Full-screen notice shown on mobile (below the `md` breakpoint). The 3D
 * creation experience needs a wider canvas, so phones get this gate instead of
 * the cramped three-column workspace.
 */
export function MobileGate() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center md:hidden"
      style={{
        background:
          "radial-gradient(at 18% 18%, rgba(187,163,255,0.40), transparent 50%), radial-gradient(at 82% 28%, rgba(159,49,255,0.18), transparent 50%), radial-gradient(at 50% 88%, rgba(99,44,255,0.16), transparent 55%), #EFEAF8",
      }}
    >
      {/* Logo tile */}
      <div className="flex size-16 items-center justify-center rounded-[18px] bg-white shadow-[0_12px_32px_rgba(99,44,255,0.20)]">
        <Image
          src="/brand/logo.png"
          alt="Morphix logo"
          width={36}
          height={34}
          className="h-[34px] w-[36px] object-contain"
          priority
        />
      </div>

      <h1 className="mt-6 text-[28px] font-bold leading-tight text-black">
        Morphix 3D works
        <br />
        best on desktop.
      </h1>

      <p className="mx-auto mt-3 max-w-[290px] text-sm leading-relaxed text-muted-500">
        Please open Morphix 3D on a laptop or desktop device for the full 3D
        creation experience.
      </p>

      <p className="absolute inset-x-0 bottom-7 text-center text-xs text-muted-400">
        © Created by Muhammad Noman
      </p>
    </div>
  );
}
