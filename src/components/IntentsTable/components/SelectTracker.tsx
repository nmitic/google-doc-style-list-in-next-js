import { Button } from "@/components/ui/button";

interface SelectTracker {
  amount: number;
  hasSelected: boolean;
  onRemoveSelection: () => void;
}

export const SelectTracker = ({
  amount,
  hasSelected,
  onRemoveSelection,
}: SelectTracker) => {
  return (
    <div className=" sticky top-0 bg-white z-50 p-3">
      <span className=" mr-3">
        <span className=" text-emerald-800 font-medium">{amount}</span> selected
      </span>
      {hasSelected && (
        <Button
          variant="destructive"
          onClick={() => {
            onRemoveSelection();
          }}
        >
          Remove selections
        </Button>
      )}
    </div>
  );
};
