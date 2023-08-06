// components/Tabs.js
"use client";
import { useState } from "react";
import Orders from "./orders";
import Pizza from "./PizzaType";

const Tabs = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="sticky top-0 border-b border-gray-300 mb-4 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 mr-4 ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-transparent text-blue-500"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Add the content of the active tab */}
      {activeTab === "Orders" && <Orders />}
      {activeTab === "Pizza managment" && <Pizza />}

      {/* Add other tabs' content in a similar manner */}
    </div>
  );
};

export default Tabs;
