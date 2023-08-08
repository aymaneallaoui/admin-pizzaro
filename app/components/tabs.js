
"use client";
import { useState } from "react";
import Orders from "./orders";
import Pizza from "./PizzaType";
import Users from "./users";
import Topping from "./toppings";

const Tabs = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <nav className="sticky top-0   z-50  border-b border-gray-300 mb-4 backdrop-filter backdrop-blur-lg bg-opacity-30  ">
        {tabs.map((tab) => (
          <>
          <button
            key={tab}
            className={`py-2 px-4 mr-4 ${
              activeTab === tab
                ? "btn btn-base-content glass mb-4 mt-4"
                : "btn btn-ghost  mb-4 mt-4"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            
            {tab}
          </button>
          
          </>
        ))}
      </nav>
     
      {activeTab === "Orders" && <Orders />}
     
      {activeTab === "Pizza managment" && <Pizza />}
      {activeTab === "clients" && <Users />}
      {activeTab === "toppings Management" && <Topping />}

     
    </>
  );
};

export default Tabs;
