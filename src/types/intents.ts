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
