import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteDeckProps {
  onDeleteDeck: () => void;
}

export function DeleteDeckButton({ onDeleteDeck }: DeleteDeckProps) {
  return (
    <Button
      variant="outline"
      onClick={() => {
        onDeleteDeck();
      }}
    >
      <Trash2 />
    </Button>
  );
}

export function DeleteDeckAlert({ onDeleteDeck }: DeleteDeckProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your deck
            and all its notes from the local storage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteDeck}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
