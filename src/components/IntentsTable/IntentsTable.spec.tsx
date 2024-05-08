import { test, expect } from "@playwright/experimental-ct-react";
import { IntentsTable } from "./IntentsTable";
import { Intent } from "@/types/intents";

test.use({ viewport: { width: 500, height: 500 } });

const IntentsMock: Intent[] = [
  {
    id: "34d7831e137a4016a55f98926800a643",
    name: "Greeting",
    description: "The visitor says hello.",
    trainingData: {
      expressionCount: 145,
      expressions: [
        {
          id: "6399fd6989984c7b871c6301744b0af5",
          text: "Hello",
        },
        {
          id: "68bafebc2a2e4843a56a221c2ceb12ed",
          text: "Hi",
        },
        {
          id: "b2a3208dc801432992812638368e0668",
          text: "Good morning!",
        },
      ],
    },
    reply: {
      id: "f35d7e0936a44102bac9cb96c81eec3b",
      text: "Hello :) How can I help you?",
    },
  },
  {
    id: "b6ec3deac5f94500aef55d9c410e37f7",
    name: "Goodbye",
    description: "The visitor says goodbye.",
    trainingData: {
      expressionCount: 86,
      expressions: [
        {
          id: "6bb364d2e3364e03b4ca30c6e46ea1dd",
          text: "Thanks, bye!",
        },
        {
          id: "2bc38310a4d1450f9e7c9e7903e458b9",
          text: "Goodbye!",
        },
        {
          id: "611c935266c1402ab76f5235827370f8",
          text: "See you",
        },
      ],
    },
    reply: {
      id: "9ba88034a89e4fdbb532bdb092717fa1",
      text: "Goodbye, have a nice day!",
    },
  },
  {
    id: "61e218983f8b49f79405e8cf22992e61",
    name: "Affirmative",
    description: "The visitor confirms that something is true / correct.",
    trainingData: {
      expressionCount: 54,
      expressions: [
        {
          id: "13039d5bff7b4e3c951c716826f3598d",
          text: "Yeah",
        },
        {
          id: "c677b5a2efe44bd8a92e2c35124a6ab1",
          text: "yep",
        },
        {
          id: "f990846d295a4b2289439efd8abedb7b",
          text: "yes, please",
        },
      ],
    },
    reply: {
      id: "3c9029f14fd74a6aac3a571d403bab35",
      text: "Great!",
    },
  },
  {
    id: "5a13917dac654cfaa10619de37a673c4",
    name: "Negative",
    description:
      "The visitor confirms that they don't need help / something is not true or similar.",
    trainingData: {
      expressionCount: 49,
      expressions: [
        {
          id: "438303d11e3a4833973c7319cdf23275",
          text: "No thanks!",
        },
        {
          id: "5db9342ebc644d6c824911323d23e568",
          text: "nope",
        },
        {
          id: "060224b8c36347f79d11bb6a73a078f6",
          text: "please don't",
        },
      ],
    },
    reply: {
      id: "133957c37f954d6a8c0b721fbc3b652a",
      text: "Alright, please let me know if I can help you with anything else!",
    },
  },
];

test("should select single intent", async ({ mount }) => {
  const component = await mount(<IntentsTable intents={IntentsMock} />);

  const intentForSelect = component.getByTestId("intent").first();

  const selectTracker = component.getByTestId("select-tracker");

  await intentForSelect.getByText("Greeting").click();

  await expect(intentForSelect).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  await expect(selectTracker).toContainText("1");
});

test("should select multiple intents with keyboard shortcut -> cmd (ctrl) + click", async ({
  mount,
}) => {
  const component = await mount(<IntentsTable intents={IntentsMock} />);

  const firstIntentForSelect = component.getByTestId("intent").first();

  await firstIntentForSelect
    .getByText("Greeting")
    .click({ modifiers: ["Meta"] });

  await expect(firstIntentForSelect).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  const secondIntentForSelect = component.getByTestId("intent").last();

  await secondIntentForSelect
    .getByText("Negative")
    .click({ modifiers: ["Meta"] });

  await expect(secondIntentForSelect).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );
  const selectTracker = component.getByTestId("select-tracker");

  await expect(selectTracker).toContainText("2");
});

test("should select all intents with keyboard shortcut -> cmd (ctrl) + a", async ({
  mount,
  page,
}) => {
  const component = await mount(<IntentsTable intents={IntentsMock} />);

  const allIntentsForSelect = component.getByTestId("intent");
  const selectTracker = component.getByTestId("select-tracker");

  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Meta+a");
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Control+a");

  for (const intentForSelect of await allIntentsForSelect.all()) {
    await expect(intentForSelect).toHaveCSS(
      "background-color",
      "rgb(20, 184, 166)" // this is expected computed value coming from applied css
    );
  }

  await expect(selectTracker).toContainText("4");
});

test("should select single one after all of intent al selected", async ({
  mount,
  page,
}) => {
  const component = await mount(<IntentsTable intents={IntentsMock} />);
  const selectTracker = component.getByTestId("select-tracker");

  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Meta+a");
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Control+a");

  const firstIntentForSelect = component.getByTestId("intent").first();

  await firstIntentForSelect.getByText("Greeting").click();

  await expect(firstIntentForSelect).toHaveCSS(
    "background-color",
    "rgb(20, 184, 166)" // this is expected computed value coming from applied css
  );

  await expect(selectTracker).toContainText("1");
});
