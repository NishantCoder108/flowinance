import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardDescription, CardTitle } from "../../ui/card";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";

interface ChartData {
  name: string;
  spent: number;
}

export default function ExpensesChart() {
  const { filteredTransactions } = useContext(AppContext);
  const [data, setData] = useState<ChartData[]>([]);
  useEffect(() => {
    const expenses = filteredTransactions!.filter((transaction) => {
      return EXPENSES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const dataArray = expenses.map((transaction) => {
      return {
        name: transaction.date,
        spent: transaction.amount,
      };
    });
    setData(dataArray);
  }, [filteredTransactions]);
  return (
    <div>
      {data.length !== 0 ? (
        <Card className="flex flex-col items-center p-4">
          <CardTitle className="mb-6">Expenses</CardTitle>
          <CardDescription className="mb-4">
            See your daily expenses at a glance. Effortlessly understand your
            daily spending trends.
          </CardDescription>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#4eb87d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>
      ) : (
        <DashboardNoDataCard
          title="Expenses"
          description=" You have not generated any expense so far."
        />
      )}
    </div>
  );
}
