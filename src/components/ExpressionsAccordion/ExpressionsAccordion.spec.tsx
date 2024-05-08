import { test, expect } from "@playwright/experimental-ct-react";
import { ExpressionsAccordion } from "./ExpressionsAccordion";

test.use({ viewport: { width: 500, height: 500 } });

test("should initially only display first expression and hide the rest", async ({
  mount,
}) => {
  const component = await mount(
    <ExpressionsAccordion
      expressions={[
        { id: "1", text: "Expression 1" },
        { id: "2", text: "Expression 2" },
        { id: "3", text: "Expression 3" },
      ]}
    />
  );

  await expect(component.getByText("Expression 1")).toBeVisible();
  await expect(component.getByText("Expression 2")).not.toBeVisible();
  await expect(component.getByText("Expression 3")).not.toBeVisible();
});

test("should toggle hidden expressions", async ({ mount }) => {
  const component = await mount(
    <ExpressionsAccordion
      expressions={[
        { id: "1", text: "Expression 1" },
        { id: "2", text: "Expression 2" },
        { id: "3", text: "Expression 3" },
      ]}
    />
  );
  await component.getByText("Show all").click();

  await expect(component.getByText("Expression 1")).toBeVisible();
  await expect(component.getByText("Expression 2")).toBeVisible();
  await expect(component.getByText("Expression 3")).toBeVisible();

  await component.getByText("Hide all").click();

  await expect(component.getByText("Expression 1")).toBeVisible();
  await expect(component.getByText("Expression 2")).not.toBeVisible();
  await expect(component.getByText("Expression 3")).not.toBeVisible();
});
