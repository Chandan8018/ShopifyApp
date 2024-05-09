import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useAuthenticatedFetch } from "../hooks";

export default function AbandonedGraph() {
  const fetch = useAuthenticatedFetch();
  const chartRef = useRef(null);
  const [customer, setCustomer] = useState(null);
  const [productPrice, setProductPrice] = useState(undefined);
  const [productTax, setProductTax] = useState(null);
  const [productDiscounts, setProductDiscounts] = useState(null);

  useEffect(() => {
    try {
      const fetchAbandoned = async () => {
        let productPrice = [];
        let tax = [];
        let discounts = [];
        let customer = [];
        const res = await fetch("/api/abandoned");
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          data.map((order) => {
            customer.push(
              `Customer Id(${order.customer.default_address.customer_id})`
            );
            productPrice.push(Number(Math.floor(order.total_price)));
            tax.push(Number(Math.floor(order.total_tax)));
            discounts.push(Number(Math.floor(order.total_discounts)));
            setCustomer(customer);
            setProductPrice(productPrice);
            setProductTax(tax);
            setProductDiscounts(discounts);
          });
        }
      };
      fetchAbandoned();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Example data for a line chart
    const data = {
      labels: customer,
      datasets: [
        {
          label: "Abandoned list as Cost Price",
          data: productPrice,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "Abandoned list as Tax Price",
          data: productTax,
          fill: false,
          borderColor: "rgb(252, 198, 3)",
          tension: 0.1,
        },
        {
          label: "Abandoned list as Discounted Price",
          data: productDiscounts,
          fill: false,
          borderColor: "rgb(252, 53, 3)",
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
  }, [productDiscounts]);
  return (
    <>
      <div
        style={{ width: "800px", marginBottom: "20px" }}
        className='mx-auto mb-10'
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "30px",
            marginBlock: "10px",
          }}
        >
          Abandoned Checkout Graph between User and Product(Cost Price, Tax,
          Discount)
        </h2>
        <canvas ref={chartRef}></canvas>
      </div>
    </>
  );
}
