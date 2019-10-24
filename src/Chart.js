import React from "react";
import { Bar } from "react-chartjs-2";

// Data preparation for the chart
const prepData = () => {
  const expenses = JSON.parse(localStorage.getItem("Expenses"));
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const currentYear = new Date().getFullYear();
  if (expenses && expenses.length) {
    // For each expenses we take its date and add the spent value to the corresponding months data
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      // If spent during current year
      if (year === currentYear) {
        // add expense value to the corresponding months value
        data[month] += expense.value;
      }
    });
    return data;
  }
  return "You have not entered any details yet!";
};

let monthlyData = prepData();
const chartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  datasets: [
    {
      label: `Monthly Expenses for current year`,
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: monthlyData
    }
  ]
};

// This component implements a chart that visualizes spending for each month
// in current year

// Class based component, got bored of hooks xD
class Chart extends React.Component {
  state = {
    viewChart: false
  };

  handleRefresh = () => {
    this.setState({ viewChart: false });
    monthlyData = prepData();
    chartData.datasets[0].data = monthlyData;
    this.setState({ viewChart: true });
  };

  render() {
    return (
      <div style={{ marginBottom: "100px" }} className="container text-center">
        {this.state.viewChart ? (
          <button className="btn btn-primary" onClick={this.handleRefresh}>
            Refresh Chart
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ viewChart: true })}
          >
            View Chart
          </button>
        )}
        <br></br>
        <small>Click to view your monthly spending for the current year</small>
        {this.state.viewChart ? (
          <Bar
            data={chartData}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default Chart;
