import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { AddDeckForm } from "./add-deck-form";
import { useState } from "react";

export function AddDeckPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="max-w-min">
          Add deck
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <AddDeckForm setIsPopoverOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
