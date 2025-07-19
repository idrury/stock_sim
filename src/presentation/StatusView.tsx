import { DateTime } from "luxon";
import StockGraph from "./StockGraph";

export interface StatusViewProps {}




/******************************
 * StatusView component
 * @todo Create description
 */
export function StatusView({}: StatusViewProps) {

    const DUMMY_DATA = new Array<{value: number, date: string}>();

    function createDummyData(interval: number, amount: number, variation: number) {

        for(var i=0; i<amount; i++) {
            DUMMY_DATA.push({
                value:         Math.random()*variation,
                date: DateTime.now().plus({ seconds: interval*i }).toFormat("hh:ss")
            })
        }

        return DUMMY_DATA;
    }
  return (
    <div>
      <StockGraph data={createDummyData(10, 100, 5)} />
    </div>
  );
}
