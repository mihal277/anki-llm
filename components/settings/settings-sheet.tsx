import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SettingsForm } from "./settings-form";

export default function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Set API keys</Button>
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
