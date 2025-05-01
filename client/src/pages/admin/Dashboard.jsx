import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, subDays } from "date-fns";

const Dashboard = () => {
  const {data, isError, isLoading} = useGetPurchasedCoursesQuery();

  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <h1 className="text-red-500">Failed to get purchased course</h1>

  const {purchasedCourse} = data || [];

  // Generate dates for the last 7 days
  const dates = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i));
  
  // Process data for the chart
  const chartData = dates.map(date => {
    const dateStr = format(date, "MMM dd");
    const daySales = purchasedCourse.filter(course => 
      format(new Date(course.createdAt), "MMM dd") === dateStr
    );
    
    return {
      label: dateStr,
      totalSales: daySales.reduce((acc, curr) => acc + (curr.amount || 0), 0),
      extrasSales: daySales.reduce((acc, curr) => acc + (curr.extrasAmount || 0), 0)
    };
  }).reverse();

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="p-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>
            Sales from {format(dates[dates.length - 1], "MMM dd yyyy")} &mdash;{" "}
            {format(dates[0], "MMM dd yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--color-grey-700)" }}
                tickLine={{ stroke: "var(--color-grey-700)" }}
              />
              <YAxis
                tick={{ fill: "var(--color-grey-700)" }}
                tickLine={{ stroke: "var(--color-grey-700)" }}
                tickFormatter={(value) => `₹${value}`}
              />
              <CartesianGrid strokeDasharray="4" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--color-grey-0)",
                  border: "1px solid var(--color-grey-100)"
                }}
                formatter={(value) => [`₹${value}`, "Sales"]}
              />
              <Area
                dataKey="totalSales"
                type="monotone"
                stroke="var(--color-brand-500)"
                fill="var(--color-brand-100)"
                strokeWidth={2}
                name="Total sales"
              />
              <Area
                dataKey="extrasSales"
                type="monotone"
                stroke="var(--color-brand-600)"
                fill="var(--color-brand-200)"
                strokeWidth={2}
                name="Extras sales"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
