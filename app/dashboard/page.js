import Tabs from "../components/Tabs";

const AdminDashboard = () => {
  const tabs = [
    "Orders",
    "Pizza managment",
    "clients",
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
// import Users from "../components/users";

// function page() {
//   return <Users />;
// }

// export default page;
