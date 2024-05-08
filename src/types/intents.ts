export type Intent = {
  id: string;
  name: string;
  description: string;
  trainingData: {
    expressionCount: number;
    expressions: Expressions;
  };
  reply: {
    id: string;
    text: string;
  };
};

export type Expressions = {
  id: string;
  text: string;
}[];

export type IntentResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Intent[];
};
