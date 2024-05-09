This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# TL;DR
- Clone this repo https://github.com/nmitic/ultimate-intents
- run pnpm i && pnpm run start in its root
- Clone the this repo https://github.com/nmitic/ultimate
- run pnpm i && pnpm dev
- Project should be available on port :3000

## Getting Started

## Please note
- Make sure that no process is running on the port :3000 - next js should be smart enough to start the process on other available port but just to me sure
- It should run on latest versions of NodeJS but I was using v18.17.0

First, make sure mock api is up and running. [Read here how to start the mock server](https://github.com/nmitic/ultimate-intents). 

Second after mock server is running, install dependencies and run the development server:

Run the following commands (npm, yarn should also work but I am using pnpm)

```bash
pnpm i
pnpm dev
pnpm run test-ct - to test component using playwright
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implemented features
I focused on implementing minimum requirements which were noted in a challenge docs. But also wanted to have some fun with it. I am hoping that is fine.

- Pagination
- Select single intent (click on the item)
- Select all intents (cmd/ctrl plus A)
- Select multiple intents (hold cmd/ctrl plus click)
- Remove selection
- Selection tracking

In case no time to waste (very valid) - core features are all implemented > [here](src/components/IntentsTable/IntentsTable.tsx) the rest can be ignored ofc.

Please note, I have not tested how this works in window env, only mac, but I am confident it should work.

## Why Next JS?
- Again, trying to move fast with things which are not relevant for the challenge, and having everything setup is very useful in such case. Otherwise, from requirements there is no need for framework such as NextJS. Bonus, I got pagination feature almost for free.

## Why Playwright?
- I wanted to test the app as close to the user as possible. With tools such as RTL we can go only so far. For example, I discovered that css is not available in jest-dom. Which would force me to include it manually or to use css in js.
- Playwright supports testing components in isolation inside a headless browser, which is perfect for the case where iterations are more then clicks, and being close to the real experience as possible.
- Tests are focused only on the features which were implemented and not tested by any of the tools I am using itself. For example, I was not focusing on testing pagination or data fetching as there is not much going on there. So I wanted to spent this little time I had with test I believe brings the most value. 

## Why Tailwind
- In all honesty, speed. I later regret it, as testing React component styled using Tailwind with RTL is very difficult without adding some hacks. I am still having love / hate relationship with it. It has its pros and cons. But for this challenge it served me well, and allowed me to move faster.

## Why shadcn?
- I wanted UI to look decent, and wanted to have as little friction with UI libs as possible, as usually it is not the case with full blown UI libs. Chadcn means I own everything as it is very easy to extend. Which I had to do in order to allow for selection features to be possible.