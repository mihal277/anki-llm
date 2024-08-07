import { ModeToggle } from "@/components/mode-toggle";
import SettingsSheet from "@/components/settings/settings-sheet";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <span className="font-bold">Anki AI Generator</span>
        </Link>
        <div className="space-x-2">
          <SettingsSheet />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
