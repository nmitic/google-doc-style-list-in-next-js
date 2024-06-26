import { IntentResponse } from "@/types/intents";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";

interface IntentPagination {
  intents: IntentResponse;
  currentPage: string | undefined;
}

export const IntentPagination = ({
  intents,
  currentPage,
}: IntentPagination) => {
  const hasNextPage = !intents.next;
  const hasPrevPage = !intents.prev;
  return (
    <Pagination className=" sticky bottom-0 bg-white z-50 p-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?_page=${intents.prev}`}
            disabled={hasPrevPage}
          />
        </PaginationItem>
        {[...Array(intents.last)].map((_e, i) => {
          const isActive = currentPage === `${i + 1}`;

          return (
            <PaginationItem key={i}>
              <PaginationLink href={`?_page=${i + 1}`} isActive={isActive}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={`?_page=${intents.next}`}
            disabled={hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
