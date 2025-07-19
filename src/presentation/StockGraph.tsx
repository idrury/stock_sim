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
  color: string;
}

interface ToolTipParams {
  active: boolean;
  payload: any[];
  label: string;
}

export default function StockGraph({
  data,
  color,
}: StockGraphParams) {
  return (
    <ResponsiveContainer width="100%" height={300}>
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
          <linearGradient
            id="danger"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="10%"
              stopColor={`${"var(--dangerColor)"}`}
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={`${"var(--dangerColor)"}`}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient
            id="safe"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="10%"
              stopColor={`${"var(--safeColor)"}`}
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor={`${"var(--safeColor)"}`}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient
            id="warning"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="10%"
              stopColor="var(--warningColor)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var(--warningColor)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Area
          type="monotoneX"
          dataKey="value"
          stroke={color}
          strokeWidth={1}
          radius={10}
          fill={`url(#${color == "var(--safeColor)"? "safe" : color == "var(--warningColor)" ? "warning" : "danger"})`}
        />

        <XAxis
          dataKey={(k) => {
            return k.date;
          }}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          interval={Math.round(data.length / 5)}
          style={{ fill: "var(--text)", fontSize: "10pt" }}
        />
        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickCount={3}
          tickMargin={10}
          tickFormatter={(number) => `$${number}`}
          style={{ fill: "var(--text)", fontSize: "10pt" }}
        />
        {/**@ts-ignore */}
        <Tooltip content={CustomTooltip} />
        <CartesianGrid strokeDasharray="2 50" vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: ToolTipParams) {
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
