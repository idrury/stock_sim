import { DateTime } from "luxon";
import StockGraph from "./StockGraph";

export interface StatusViewProps {}

/******************************
 * StatusView component
 * @todo Create description
 */
export function StatusView({}: StatusViewProps) {
  const DUMMY_DATA = new Array<{ value: number; date: string }>();

  function createDummyData(
    interval: number,
    amount: number,
    variation: number
  ) {
    let multi = 1;

    for (var i = 0; i < amount; i++) {
      DUMMY_DATA.push({
        value: Math.random() * variation * multi + (multi/2),
        date: DateTime.now()
          .plus({ seconds: interval * i })
          .toFormat("hh:ss"),
      });
      multi += 1;
    }

    return DUMMY_DATA;
  }
  return (
    <div>
      <StockGraph data={createDummyData(10, 120, 1)} />
    </div>
  );
}
