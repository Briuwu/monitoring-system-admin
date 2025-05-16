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
  "2 Years": {
    label: "2 Years",
  },
  "3 Years": {
    label: "3 Years",
  },
  "4 Years": {
    label: "4 Years",
  },
  "5 Years": {
    label: "5 Years",
  },
  "10 Years": {
    label: "10 Years",
  },
  "N/A": {
    label: "N/A",
  },
  Others: {
    label: "Others",
  },
} satisfies ChartConfig;

type Props = {
  chartData: {
    date: string;
    value: number;
    fill: string;
  }[];
};

/**
 * This is the main component for the bar chart overview.
 * It is used to display the bar chart overview.
 */

function BarChartOverview({ chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliances Overview</CardTitle>
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
          Showing total compliance value
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChartOverview;
