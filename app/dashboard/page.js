import Tabs from "../components/tabs";

const AdminDashboard = () => {
  const tabs = ["Orders", "Pizza managment", "clients", "toppings Management"];

  return (
    <div className="p-8 bg-neutral-focus ">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs tabs={tabs} defaultTab="Orders" />
    </div>
  );
};

export default AdminDashboard;

// import React from "react";
// import Topping from "../components/toppings";

// function page() {
//   return <Topping />;
// }

// export default page;
