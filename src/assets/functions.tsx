import { StockGraphParamater } from "./types";

// Helper to apply multiplier
export const getNextValue = (
  risk: number,
  posMultiplier: number,
  negMultiplier: number
): number => {
  if (Math.random() > 0.4) {
    return risk * posMultiplier;
  } else {
    return risk * negMultiplier;
  }
};

/************************
 * Limit a graphs length
 * @param data
 * @returns
 */
export function reduceGraph(
  data: StockGraphParamater[],
  lengthToReduce: number
): StockGraphParamater[] {
  const returnGraph = new Array<StockGraphParamater>();
  const skips = Math.round(data.length / lengthToReduce);
  let periodTotal = 0;
  let numInPeriod = 0;

  if (data.length > lengthToReduce) {
    data.forEach((d, i) => {
      numInPeriod = numInPeriod + 1;
      periodTotal = periodTotal + d.value;

      if (i % skips == 0) {
        returnGraph.push({
          value: periodTotal / numInPeriod,
          date: d.date,
        });
        numInPeriod = 0;
        periodTotal = 0;
      }
    });
  } else return data;

  return returnGraph;
}
