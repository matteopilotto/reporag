import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CodebaseSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (codebase: string) => void;
}

export function CodebaseSelectionDialog({
  isOpen,
  onClose,
  onSelect,
}: CodebaseSelectionDialogProps) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Codebase</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <select
            className="w-full px-4 py-2 border rounded appearance-none"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">Select a codebase</option>
            <option value="repo1">Repository 1</option>
            <option value="repo2">Repository 2</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!selectedValue}
            onClick={() => {
              onSelect(selectedValue), onClose();
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
