import { TableBody } from "@/components/ui/table";
import { useEffect } from "react";

interface SelectableTableBody {
  children: React.ReactNode;
  onSelectAll: () => void;
}

export const SelectableTableBody = ({
  children,
  onSelectAll,
}: SelectableTableBody) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        // Ctrl (or Cmd) + A key is pressed
        console.log("Ctrl (or Cmd) + A pressed");

        onSelectAll();

        // Prevent the default browser action (text selection)
        event.preventDefault();
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [children, onSelectAll]);
  return <TableBody>{children}</TableBody>;
};
