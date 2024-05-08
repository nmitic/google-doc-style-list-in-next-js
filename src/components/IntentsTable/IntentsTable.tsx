"use client";

import { Intent } from "@/types/intents";
import { ExpressionsAccordion } from "../ExpressionsAccordion/ExpressionsAccordion";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../ui/table";
import { useState } from "react";
import { SelectTracker } from "./components/SelectTracker";
import { SelectableTableBody } from "./components/SelectableTableBody";
import { SelectableTableRow } from "./components/SelectableTableRow";

import "../../app/globals.css";

export const IntentsTable = ({ intents }: { intents: Intent[] }) => {
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);

  const selectedAmount = selectedIntents.length;
  const hasSelectedIntents = !!selectedAmount;

  return (
    <>
      <SelectTracker
        hasSelected={hasSelectedIntents}
        amount={selectedAmount}
        onRemoveSelection={() => setSelectedIntents([])}
      />
      <Table>
        <TableCaption>
          Hint: click to select, cmd (ctrl) + click to select multiple and cmd
          (ctrl) + A to select all intents.
        </TableCaption>
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
            setSelectedIntents((prev) => {
              const allIntentsWithNoDuplicates = [
                ...new Set([...prev, ...intents.map((intent) => intent.id)]),
              ];
              return allIntentsWithNoDuplicates;
            });
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
    </>
  );
};
