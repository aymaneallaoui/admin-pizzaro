"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUser] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Default to 'all' orders

  const fetchData = useCallback(async () => {
    try {
      const [usersResponse, ordersResponse] = await Promise.all([
        fetch("/api/users",{cache: 'no-store',}).then((response) => response.json()),
        fetch("/api/orders", {cache: 'no-store',}).then((response) => response.json()),
      ]);

      setUser(usersResponse);
      setOrders(ordersResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalAmountSum = useMemo(() => {
    return orders.reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);
  }, [orders]);

  const filterOrdersByTimeRange = (timeRange) => {
    const currentDate = new Date();
    switch (timeRange) {
      case "today":
        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.toDateString() === currentDate.toDateString();
        });
      case "lastDay":
        // Filter orders from the last 24 hours
        const lastDay = new Date(currentDate);
        lastDay.setDate(lastDay.getDate() - 1);
        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= lastDay;
        });
      case "last7Days":
        // Filter orders from the last 7 days
        const last7Days = new Date(currentDate);
        last7Days.setDate(last7Days.getDate() - 7);
        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= last7Days;
        });
      case "lastMonth":
        // Filter orders from the last month
        const lastMonth = new Date(currentDate);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= lastMonth;
        });
      case "lastYear":
        // Filter orders from the last year
        const lastYear = new Date(currentDate);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= lastYear;
        });
      default:
        return orders; // 'all' orders
    }
  };
  const filteredOrders = filterOrdersByTimeRange(selectedFilter);
  const filteredUsers = useMemo(() => {
    const userIdsInFilteredOrders = filteredOrders.map((order) => order.userId);
    return users.filter((user) => userIdsInFilteredOrders.includes(user.id));
  }, [users, filteredOrders]);
  const totalAmountSumFiltered = useMemo(() => {
    return filteredOrders.reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);
  }, [filteredOrders]);

  return (
    <div className="container mx-auto px-4 bg-neutral-focus pt-4 ">
      <h1 className=" text-4xl font-bold mb-4 text-center mt-4 ">All Orders</h1>

      {loading ? (
        <span className="loading loading-ring loading-lg bg-primary flex items-center justify-center"></span>
      ) : (
        <>
          <div className="flex justify-center mb-4">
            <div className="dropdown dropdown-hover ">
              <label tabIndex={0} className="btn m-1">
                {selectedFilter
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toUpperCase()}
              </label>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={() => setSelectedFilter("all")} value="all">
                  <a>All Orders </a>
                </li>
                <li onClick={() => setSelectedFilter("today")} value="today">
                  <a>Today</a>
                </li>
                <li
                  onClick={() => setSelectedFilter("lastDay")}
                  value="lastDay"
                >
                  <a>Last 24 Hours</a>
                </li>
                <li
                  onClick={() => setSelectedFilter("Last 7 Days")}
                  value="last7Days"
                >
                  <a>Last 7 Days</a>
                </li>
                <li
                  onClick={() => setSelectedFilter("lastMonth")}
                  value="lastMonth"
                >
                  <a>Last Month</a>
                </li>
                <li
                  onClick={() => setSelectedFilter("lastYear")}
                  value="lastYear"
                >
                  <a>Last Year</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              }
              title="Number of orders"
              value={filteredOrders.length}
            />

            <StatCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              }
              title="Number of clients"
              value={filteredUsers.length}
            />

            <StatCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              }
              title="Sales $$$"
              value={`${totalAmountSumFiltered.toFixed(2)} $`}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredOrders.map((order) => {
              const user = users.find((user) => user.id === order.userId);
              return (
                <OrderCard
                  key={order.id}
                  address={user ? user.address : "Unknown Address"}
                  date={order.createdAt}
                  idOrder={order.id}
                  totalAmount={order.totalAmount}
                  userId={user ? user.name : "Unknown User"}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="p-4 bg-accent shadow-lg rounded-lg">
      <div className="flex items-center justify-center mb-2 text-blue-600">
        {icon}
      </div>
      <div className="flex items-center justify-center text-xl font-semibold text-base-400">
        {title}
      </div>
      <div className="flex items-center justify-center text-3xl font-bold text-base-content">
        {value}
      </div>
    </div>
  );
}

function OrderCard({ idOrder, totalAmount, date, userId, address }) {
  return (
    <div className="card w-full bg-base-200 shadow-xl card-normal">
      <div className="card-body">
        <h2 className=" text-base-content card-title">
          Order Number: {idOrder}
        </h2>
        <p>
          <span className="text-base-content"> Total Amount: </span>
          {totalAmount.toFixed(2)} $
        </p>
        <p>
          <span className="text-base-content"> Client Name: </span> {userId}
        </p>
        <p>
          <span className="text-base-content"> Client Address:</span> {address}
        </p>
        <p>
          <span className="text-base-content"> Order Date: </span> {date}
        </p>
      </div>
    </div>
  );
}

export default Orders;
