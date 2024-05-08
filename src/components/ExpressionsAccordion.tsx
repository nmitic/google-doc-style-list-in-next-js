"use client";

import { cn } from "@/lib/utils";
import { Expressions } from "@/types/intents";
import { useState } from "react";
import { Button } from "./ui/button";

export const ExpressionsAccordion = ({
  expressions,
}: {
  expressions: Expressions;
}) => {
  const [isListExpended, setIsListExpended] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsListExpended((prev) => !prev)}
        className="mb-3"
      >
        {isListExpended ? "Hide all" : "Show all"}
      </Button>
      <ul>
        {expressions.map((expression) => {
          return (
            <ol
              key={expression.id}
              className={cn({ "hidden first-of-type:block": !isListExpended })}
            >
              {expression.text}
            </ol>
          );
        })}
      </ul>
    </>
  );
};
