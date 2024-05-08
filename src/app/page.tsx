import { IntentsTable } from "@/components/IntentsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

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
      <IntentsTable intents={intents.data} />
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
