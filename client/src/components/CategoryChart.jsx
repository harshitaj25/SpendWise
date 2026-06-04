import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
];
function CategoryChart({ summary }) {

    const data = Object.entries(
        summary.categoryTotals || {}
    ).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <PieChart width={320} height={250}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
            >
                {data.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>

            <Tooltip />
            <Legend />
        </PieChart>
    );
}

export default CategoryChart;