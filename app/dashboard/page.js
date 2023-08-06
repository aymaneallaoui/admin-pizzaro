// pages/index.js
// eslint-disable-next-line
import Tabs from "../components/Tabs";

const AdminDashboard = () => {
  const tabs = [
    "Orders",
    "Pizza managment",
    "Users",
    "Pizza Types",
    "Pizza Toppings",
  ];

  return (
    <div className="p-8 bg-neutral-focus ">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs tabs={tabs} defaultTab="Orders" />
    </div>
  );
};

export default AdminDashboard;

// // import React from "react";
// // import Orders from "../components/orders";

// // function page() {
// //   return <Orders />;
// // }

// // export default page;

// import React from "react";
// import Pizza from "../components/PizzaType";

// function page() {
//   return <Pizza />;
// }

// export default page;
