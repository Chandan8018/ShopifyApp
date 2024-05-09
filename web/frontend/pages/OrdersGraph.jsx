import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useAuthenticatedFetch } from "../hooks";

export default function OrdersGraph() {
  const fetch = useAuthenticatedFetch();
  const chartRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  useEffect(async () => {
    try {
      let totalOrder = 0;
      let totalTax = 0;
      let totalDiscounts = 0;
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        data.map((order) => {
          totalOrder += Number(Math.floor(order.total_price));
          totalTax += Number(Math.floor(order.total_tax));
          totalDiscounts += Number(Math.floor(order.total_discounts));
        });
        setTotalPrice(totalOrder);
        setTotalTax(totalTax);
        setTotalDiscounts(totalDiscounts);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Example data for a line chart
    const data = {
      labels: ["Total Price", "Total Tax", "Total Discounts"],
      datasets: [
        {
          label: "Order Summary",
          data: [totalPrice, totalTax, totalDiscounts],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    // Create a new Chart instance
    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
    });

    // Cleanup function to destroy the chart on unmount
    return () => {
      myChart.destroy();
    };
  }, [totalDiscounts]);
  return (
    <>
      <div style={{ width: "800px", marginBottom: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            marginBlock: "10px",
          }}
        >
          Order Summary according to Price
        </h2>
        <canvas ref={chartRef}></canvas>
      </div>
    </>
  );
}
