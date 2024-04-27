import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SettingsForm } from "./settings-form";
import { Settings } from "lucide-react";

export default function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>API keys</SheetTitle>
          <SheetDescription>
            To generate the Anki flashcards, you need to provide the OpenAI API
            key. If the flashcards are supposed to have audio, you also need to
            provide Play.ht credentials.
          </SheetDescription>
        </SheetHeader>
        <SettingsForm />
      </SheetContent>
    </Sheet>
  );
}
