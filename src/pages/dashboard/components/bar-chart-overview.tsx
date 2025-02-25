import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
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
  { date: "annual", value: 1, fill: "var(--color-annual)" },
  { date: "semiAnnual", value: 2, fill: "var(--color-semiAnnual)" },
  { date: "quarterly", value: 0, fill: "var(--color-quarterly)" },
  { date: "monthly", value: 3, fill: "var(--color-monthly)" },
];

const chartConfig = {
  value: {
    label: "Total",
  },
  annual: {
    label: "Annual",
  },
  semiAnnual: {
    label: "Semi Annual",
  },
  quarterly: {
    label: "Quarterly",
  },
  monthly: {
    label: "Monthly",
  },
} satisfies ChartConfig;

export function BarChartOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="date"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total subscription value
        </div>
      </CardFooter>
    </Card>
  );
}
