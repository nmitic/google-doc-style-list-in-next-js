import { TableRow } from "../../ui/table";
import { cn } from "../../../lib/utils";

interface SelectableTableRow<T> {
  data: T;
  children: React.ReactNode;
  onSelect: (data: T) => void;
  onSelectMultiple: (data: T) => void;
  isSelected: boolean;
}

export const SelectableTableRow = <T,>({
  children,
  data,
  onSelect,
  onSelectMultiple,
  isSelected,
}: SelectableTableRow<T>) => {
  return (
    <TableRow
      data-testid="intent"
      onClick={(event) => {
        if (event.ctrlKey || event.metaKey) {
          // Ctrl (or Cmd) key is pressed along with the click
          onSelectMultiple(data);
          return;
        }

        onSelect(data);
      }}
      className={cn(
        {
          "bg-teal-500 hover:bg-teal-500 border-teal-800": isSelected,
        },
        " cursor-pointer"
      )}
    >
      {children}
    </TableRow>
  );
};
