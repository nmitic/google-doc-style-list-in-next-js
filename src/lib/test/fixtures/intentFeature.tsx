import { IntentsTable } from "@/components/IntentsTable/IntentsTable";
import { Intent } from "@/types/intents";
import { Locator, Page } from "@playwright/test";

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

export class IntentFeature {
  private readonly component: Promise<Locator>;

  constructor(public readonly mount: any, public readonly page: Page) {
    this.component = this.mount(<IntentsTable intents={IntentsMock} />);
  }
  async getLocators() {
    return {
      intents: (await this.component).getByTestId("intent"),
      selectTracker: (await this.component).getByTestId("select-tracker"),
      firstIntent: (await this.component).getByTestId("intent").first(),
      lastIntent: (await this.component).getByTestId("intent").last(),
    };
  }

  async selectFirst(options?: { whileHoldingCmd: boolean }) {
    const { firstIntent } = await this.getLocators();

    await firstIntent
      .getByText("Greeting")
      .click(options?.whileHoldingCmd ? { modifiers: ["Meta"] } : undefined);
  }

  async selectLast(options?: { whileHoldingCmd: boolean }) {
    const { lastIntent } = await this.getLocators();

    await lastIntent
      .getByText("Negative")
      .click(options?.whileHoldingCmd ? { modifiers: ["Meta"] } : undefined);
  }

  async selectAll() {
    await this.page.keyboard.press("Meta+A");
    await this.page.keyboard.press("Meta+a");
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Control+a");
  }
}
