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

const chartConfig = {
  value: {
    label: "Total",
  },
  Annual: {
    label: "Annual",
  },
  SemiAnnual: {
    label: "Semi Annual",
  },
  Quarterly: {
    label: "Quarterly",
  },
  Monthly: {
    label: "Monthly",
  },
} satisfies ChartConfig;

type Props = {
  chartData: {
    date: string;
    value: number;
    fill: string;
  }[];
};

export function BarChartOverview({ chartData }: Props) {
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
              left: 20,
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
