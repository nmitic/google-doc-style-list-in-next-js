import { test as baseTest, expect } from "@playwright/experimental-ct-react";
import { IntentFeature } from "./intentFeature";

type CustomFixtures = {
  intentFeature: IntentFeature;
};

const test = baseTest.extend<CustomFixtures>({
  intentFeature: async ({ page, mount }, use) => {
    // Set up the fixture.
    const intentFeature = new IntentFeature(mount, page);
    await use(intentFeature);
  },
});

export { test, expect };
