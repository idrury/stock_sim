import StockGraph from "./StockGraph";

export interface StatusViewProps {
  data: { value: number; date: string }[];
}

/******************************
 * StatusView component
 * @todo Create description
 */
export function StatusView({ data }: StatusViewProps) {
  return (
    <div>
      <StockGraph data={data} />
    </div>
  );
}
