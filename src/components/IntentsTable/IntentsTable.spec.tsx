import { test, expect } from "../../lib/test/fixtures";

test.use({ viewport: { width: 500, height: 500 } });

test("should select single intent", async ({ intentFeature }) => {
  const { firstIntent, selectTracker } = await intentFeature.getLocators();

  await intentFeature.selectFirst();

  await expect(firstIntent).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  await expect(selectTracker).toContainText("1");
});

test("should select multiple intents with keyboard shortcut -> cmd (ctrl) + click", async ({
  intentFeature,
}) => {
  const { firstIntent, lastIntent, selectTracker } =
    await intentFeature.getLocators();

  await intentFeature.selectFirst({ whileHoldingCmd: true });
  await expect(firstIntent).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  await intentFeature.selectLast({ whileHoldingCmd: true });

  await expect(lastIntent).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  await expect(selectTracker).toContainText("2");
});

test("should select all intents with keyboard shortcut -> cmd (ctrl) + a", async ({
  intentFeature,
}) => {
  const { intents, selectTracker } = await intentFeature.getLocators();
  await intentFeature.selectAll();

  for (const intentForSelect of await intents.all()) {
    await expect(intentForSelect).toHaveCSS(
      "background-color",
      "rgb(20, 184, 166)" // this is expected computed value coming from applied css
    );
  }

  await expect(selectTracker).toContainText("4");
});

test("should select single one after all of intent are selected", async ({
  intentFeature,
}) => {
  const { firstIntent, selectTracker } = await intentFeature.getLocators();
  await intentFeature.selectAll();
  await intentFeature.selectFirst();

  await expect(firstIntent).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  await expect(selectTracker).toContainText("1");
});
