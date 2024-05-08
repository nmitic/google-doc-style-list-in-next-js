import { ExpressionsAccordion } from "@/components/ExpressionsAccordion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Intent } from "@/types/intents";

export type IntentResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Intent[];
};

type SearchParams = {
  [key in "_page" | "_per_page"]?: string | undefined;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const currentPage = searchParams?._page ? searchParams._page : 1;
  const showPerPage = searchParams?._per_page ? searchParams._per_page : 10;

  const response = await fetch(
    `http://localhost:4000/intents?_page=${currentPage}&&_per_page=${showPerPage}`
  );
  const intents: IntentResponse = await response.json();

  return (
    <main>
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
          {intents.data.map((intent) => (
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?_page=${intents.prev}`}
              disabled={!intents.prev}
            />
          </PaginationItem>
          {[...Array(intents.last)].map((_e, i) => {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`?_page=${i + 1}`}
                  isActive={searchParams?._page === `${i + 1}`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href={`?_page=${intents.next}`}
              disabled={!intents.next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
