import StockGraph from "./StockGraph";

export interface StatusViewProps {
  data: { value: number; date: string }[];
  color: string;
}

/******************************
 * StatusView component
 * @todo Create description
 */
export function StatusView({ data, color }: StatusViewProps) {
  return (
    <div>
      <StockGraph data={data} color={color} />
    </div>
  );
}
