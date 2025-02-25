import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { type: "Annual", value: 1 },
  { type: "Semi-annual", value: 2 },
  { type: "Quarterly", value: 0 },
  { type: "Monthly", value: 3 },
];

const chartConfig = {
  value: {
    label: "Users",
  },
} satisfies ChartConfig;

export function BarChartOverview() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Subscription Overview</CardTitle>
        <CardDescription>
          Total subscription overview for this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="value"
              layout="vertical"
              fill="var(--color-value)"
              radius={4}
            >
              <LabelList
                dataKey="type"
                position="insideLeft"
                offset={8}
                className=""
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-xs">
        <div className="leading-none text-muted-foreground">
          Showing total subscription for this month
        </div>
      </CardFooter>
    </Card>
  );
}
