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

export const IntentsTable = ({ intents }: { intents: Intent[] }) => {
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
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.id}>
            <TableCell className="font-medium">{intent.name}</TableCell>
            <TableCell>{intent.description}</TableCell>
            <TableCell>
              <ExpressionsAccordion
                expressions={intent.trainingData.expressions}
              />
            </TableCell>
            <TableCell>{intent.trainingData.expressionCount}</TableCell>
            <TableCell>{intent.reply.text}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
