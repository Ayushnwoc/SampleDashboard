import React, { useEffect, useState } from "react";
import {
	BsFillArchiveFill,
	BsFillGrid3X3GapFill,
	BsPeopleFill,
	BsFillBellFill,
} from "react-icons/bs";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import data from "./assets/eve.js";

function Home() {
	// Process data for charts
	const alertCounts = Object.entries(
		data.reduce((acc, cur) => {
			const date = new Date(cur.timestamp);
			const hour = date.getHours();
			const key = `${hour}:00`;
			if (!acc[key]) acc[key] = 0;
			acc[key]++;
			return acc;
		}, {})
	).map(([key, value]) => ({ name: key, count: value }));

	const severityDistribution = Object.entries(
		data.reduce((acc, cur) => {
			const severity = cur.alert?.severity || "unknown";
			if (!acc[severity]) acc[severity] = 0;
			acc[severity]++;
			return acc;
		}, {})
	).map(([key, value]) => ({ name: key, count: value }));

	const topSrcIps = Object.entries(
		data.reduce((acc, cur) => {
			const srcIp = cur.src_ip;
			if (!acc[srcIp]) acc[srcIp] = 0;
			acc[srcIp]++;
			return acc;
		}, {})
	)
		.map(([key, value]) => ({ name: key, count: value }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 10);

	const alertCountsByPort = Object.entries(
		data.reduce((acc, cur) => {
			const port = cur.dest_port;
			if (!acc[port]) acc[port] = 0;
			acc[port]++;
			return acc;
		}, {})
	)
		.map(([key, value]) => ({ name: key, count: value }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 10);

	const alertCategories = Object.entries(
		data.reduce((acc, cur) => {
			const category = cur.alert?.category || "unknown";
			if (!acc[category]) acc[category] = 0;
			acc[category]++;
			return acc;
		}, {})
	).map(([key, value]) => ({ name: key, value }));

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	return (
		<main className="main-container">
			<div className="main-title">
				<h3>ALERT DASHBOARD</h3>
			</div>
			<div className="main-cards">
            <div className="card">
					<div className="card-inner">
						<h3>TOTAL ALERTS</h3>
						<BsFillBellFill className="card_icon" />
					</div>
					<h1>{data.length}</h1>
				</div>
			</div>

			<div className="charts">
				<div className="chart-container">
					<h4>Alert Counts by Hour</h4>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={alertCounts}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="name"
								label={{
									value: "Time",
									position: "insideBottomRight",
									offset: -6,
								}}
							/>
							<YAxis
								label={{
									value: "Alert Count",
									angle: -90,
									position: "insideLeft",
								}}
							/>
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="count"
								stroke="#8884d8"
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="chart-container">
					<h4>Severity Level Distribution</h4>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={severityDistribution}>
							<XAxis
								dataKey="name"
								label={{
									value: "Severity Level",
									position: "insideBottomRight",
									offset: -6,
								}}
							/>
							<YAxis
								label={{
									value: "Count",
									angle: -90,
									position: "insideLeft",
								}}
							/>
							<Tooltip />
							<Legend />
							<Bar
								dataKey="count"
								fill="#82ca9d"
								name="Severity Count"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="chart-container">
					<h4>Alert Counts by Destination Port</h4>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={alertCountsByPort}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="name"
								label={{
									value: "Port",
									position: "insideBottomRight",
									offset: -6,
								}}
							/>
							<YAxis
								label={{
									value: "Alert Count",
									angle: -90,
									position: "insideLeft",
								}}
							/>
							<Tooltip />
							<Legend />
							<Bar dataKey="count" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="chart-container">
					<h4>Top 10 Threat Source IPs</h4>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={topSrcIps}>
							<XAxis
								dataKey="name"
								label={{
									value: "Source",
									position: "insideBottomRight",
									offset: -6,
								}}
								tick={false}
							/>
							<YAxis
								label={{
									value: "Count",
									angle: -90,
									position: "insideLeft",
								}}
							/>
							<Tooltip
								content={({ payload, label }) => {
									if (payload && payload.length > 0) {
										return (
											<div className="custom-tooltip">
												<p>
													<strong>IP:</strong> {label}
												</p>
												<p>
													<strong>Count:</strong>{" "}
													{payload[0].value}
												</p>
											</div>
										);
									}
									return null;
								}}
							/>
							<Legend />
							<Bar
								dataKey="count"
								fill="#8884d8"
								name="Threat Source Count"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="chart-container">
					<h4>Alert Categories</h4>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={alertCategories}
								cx="50%"
								cy="50%"
								outerRadius={100}
								fill="#8884d8"
								dataKey="value"
							>
								{alertCategories.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</main>
	);
}

export default Home;
