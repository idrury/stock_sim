import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface StockGraphParams {
  data: { date: string; value: number }[];
}

interface ToolTipParams {
    active: boolean;
    payload: any[];
    label:string;
}

export default function StockGraph({ data }: StockGraphParams) {
    console.log(data)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 30,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--primaryColor)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var(--primaryColor)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Area
          type="monotoneX"
          dataKey="value"
          stroke="var(--primaryColor)"
          strokeWidth={1}
          radius={10}
          fill="url(#color)"
        />

        <XAxis
          dataKey={(k) => {
            return k.date;
          }}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          interval={4}
          style={{ fill: "var(--text)" }}
        />
        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickCount={3}
          tickMargin={10}
          tickFormatter={(number) => `$${number}`}
          style={{ fill: "var(--text)" }}
        />
        {/**@ts-ignore */}
        <Tooltip content={CustomTooltip} />
        <CartesianGrid strokeDasharray="2 5" vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }:ToolTipParams) {
  if (active) {
    return (
      <div className="boxedDark mediumFade">
        <p className="boldLabel">{label}</p>
        <p>
          {payload[0]?.value
            ? `$${Math.round(payload[0].value * 100) / 100}`
            : 0}
        </p>
      </div>
    );
  }
  return null;
}
