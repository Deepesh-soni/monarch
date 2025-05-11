import React, { useState, useEffect } from "react";
import { Button, Spin, Alert } from "antd";
import { ComposedChart, YAxis, CartesianGrid, Area, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { client } from "@axiosClient";
import useMobileView from "@hooks/useMobileView";

const TIME_FRAMES = ["1W", "1M", "3M", "6M", "1Y", "5Y", "MAX"];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const dateStr = new Date(label).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        return (
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    border: "1px solid #ccc",
                }}
            >
                <p>{`Date: ${dateStr}`}</p>
                <p>{`Price: ${formatValue(payload[0]?.value, true)}`}</p>
                {payload[1] && <p>{`Volume: ${payload[1]?.value}`}</p>}
            </div>
        );
    }
    return null;
};

const formatValue = (value, show = false) => {
    return show
        ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`
        : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
};

const StockChart = ({ stockCode = "delhivery" }) => {
    const [timeFrame, setTimeFrame] = useState("1Y");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isMobile = useMobileView();

    useEffect(() => {
        setLoading(true);
        setError("");
        client
            .get(`/stock/chart/price/${stockCode}/${timeFrame}`)
            .then(res => {
                const formatted = res?.data?.data?.map(d => ({
                    ...d,
                    date: new Date(d.date),
                    volume: +d.volume,
                }));
                if (!formatted || formatted.length === 0) {
                    throw new Error("No data available");
                }
                setData(formatted);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError("Data is currently unavailable. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, [stockCode, timeFrame]);

    return (
        <div>
            <div style={{ marginBottom: 16, textAlign: "center" }}>
                {TIME_FRAMES.map(tf => (
                    <Button
                        key={tf}
                        type={timeFrame === tf ? "primary" : "default"}
                        onClick={() => setTimeFrame(tf)}
                        style={{ margin: "0 5px" }}
                    >
                        {tf}
                    </Button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: "center", paddingTop: 100 }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ maxWidth: 600, margin: "0 auto" }}
                />
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis
                            dataKey="date"
                            fontSize={10}
                            tickFormatter={date => {
                                const d = new Date(date);
                                const isShortTerm = ["1W", "1M", "3M"].includes(timeFrame);
                                return d
                                    .toLocaleDateString("en-US", {
                                        month: "short",
                                        ...(isShortTerm && { day: "numeric" }),
                                        year: "2-digit",
                                    })
                                    .replace(" ", "' ");
                            }}
                        />
                        <YAxis
                            yAxisId="price"
                            tickFormatter={val => `₹ ${val.toLocaleString("en-IN")}`}
                            width={isMobile ? 60 : 100}
                            fontSize={isMobile ? 10 : 'default'}
                        />
                        <YAxis
                            yAxisId="volume"
                            orientation="right"
                            domain={[0, dataMax => dataMax * 2]}
                            hide
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            yAxisId="price"
                            type="monotone"
                            dataKey="close"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.2}
                        />
                        <Bar
                            yAxisId="volume"
                            dataKey="volume"
                            fill="#82ca9d"
                            barSize={6}
                            opacity={0.5}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default StockChart; 