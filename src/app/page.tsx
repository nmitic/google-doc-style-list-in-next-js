import { IntentPagination } from "@/components/IntentPagination";
import { IntentsTable } from "@/components/IntentsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

import { Intent, IntentResponse } from "@/types/intents";

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
    <main className=" max-w-[1200px] m-auto p-3">
      <section className=" mb-6">
        <IntentsTable intents={intents.data} />
      </section>
      <IntentPagination intents={intents} currentPage={searchParams?._page} />
    </main>
  );
}
