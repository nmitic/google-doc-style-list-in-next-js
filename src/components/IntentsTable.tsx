"use client";

import { Intent } from "@/types/intents";
import { ExpressionsAccordion } from "./ExpressionsAccordion";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SelectableTableRow<T> {
  data: T;
  children: React.ReactNode;
  onSelect: (data: T) => void;
  onSelectMultiple: (data: T) => void;
  isSelected: boolean;
}

interface SelectableTableBody {
  children: React.ReactNode;
  onSelectAll: () => void;
}

const SelectableTableRow = <T,>({
  children,
  data,
  onSelect,
  onSelectMultiple,
  isSelected,
}: SelectableTableRow<T>) => {
  return (
    <TableRow
      onClick={(event) => {
        if (event.ctrlKey || event.metaKey) {
          // Ctrl (or Cmd) key is pressed along with the click
          onSelectMultiple(data);
          return;
        }

        onSelect(data);
      }}
      className={cn({
        "bg-teal-500 hover:bg-teal-500 border-teal-800": isSelected,
      })}
    >
      {children}
    </TableRow>
  );
};

const SelectableTableBody = ({
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

export const IntentsTable = ({ intents }: { intents: Intent[] }) => {
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Expressions</TableHead>
          <TableHead>Expressions count</TableHead>
          <TableHead>Reply</TableHead>
        </TableRow>
      </TableHeader>
      <SelectableTableBody
        onSelectAll={() => {
          setSelectedIntents(() => intents.map((intent) => intent.id));
        }}
      >
        {intents.map((intent) => {
          const isSelected = selectedIntents.includes(intent.id);
          return (
            <SelectableTableRow
              key={intent.id}
              data={intent.id}
              onSelect={(id) => {
                setSelectedIntents(() => [id]);
              }}
              onSelectMultiple={(id) =>
                setSelectedIntents((prev) => [...prev, id])
              }
              isSelected={isSelected}
            >
              <TableCell className="font-medium">{intent.name}</TableCell>
              <TableCell>{intent.description}</TableCell>
              <TableCell>
                <ExpressionsAccordion
                  expressions={intent.trainingData.expressions}
                />
              </TableCell>
              <TableCell>{intent.trainingData.expressionCount}</TableCell>
              <TableCell>{intent.reply.text}</TableCell>
            </SelectableTableRow>
          );
        })}
      </SelectableTableBody>
    </Table>
  );
};
