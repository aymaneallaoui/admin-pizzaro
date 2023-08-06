"use client";
import React, { useState, useEffect } from "react";

function Pizza() {
  const [Pizza, setPizza] = useState({});
  const [loading, setLoading] = useState(true);
  const [pizzadd, setPizzadd] = useState(false);

  function handleMesssageclose() {
    setPizzadd(false);
  }

  function handlePizzaddChange(value) {
    setPizzadd(value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [PizzaResponse] = await Promise.all([
          fetch("/api/pizza").then((response) => response.json()),
        ]);
        setPizza(PizzaResponse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalAmountSum = Object.values(Pizza).reduce((total, Pizza) => {
    return +(total + Pizza.price).toFixed(2);
  }, 0);
  return (
    <>
      <div className="container mx-auto px-4 bg-neutral-focus pt-4 ">
        <h1 className=" text-4xl font-bold mb-4 text-center mt-4 ">
          All Pizza
        </h1>
        {loading ? (
          <span className="loading loading-ring loading-lg bg-primary flex items-center justify-center"></span>
        ) : (
          <>
            <div className="grid grid-cols-1  gap-4 sm:grid-cols-3">
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
                title="Number of Pizza"
                value={Pizza.length}
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
                title="Total price of menu"
                value={totalAmountSum}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3">
              {Object.values(Pizza).map((pizza) => (
                <OrderCard
                  key={pizza.id}
                  pizzaName={pizza.name}
                  pizzaId={pizza.id}
                  pizzaPrice={pizza.price}
                />
              ))}

              <div className="card w-full bg-base-200 shadow-xl card-normal">
                <div className="card-body">
                  <div
                    className="tooltip"
                    data-tip="Click here to add new pizza"
                  >
                    <button
                      className="btn"
                      onClick={() => window.my_modal_5.showModal()}
                    >
                      Add New Pizza
                    </button>
                  </div>
                </div>
              </div>
              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div method="dialog" className="modal-box">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => window.my_modal_5.close()}
                  >
                    ✕
                  </button>
                  <AddPizzaForm handlePizzaddChange={handlePizzaddChange} />
                </div>
              </dialog>
            </div>
          </>
        )}
      </div>
      {pizzadd ? (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your Pizza has been added</span>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleMesssageclose}
          >
            close
          </button>
        </div>
      ) : null}
    </>
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

function OrderCard({ pizzaId, pizzaPrice, pizzaName }) {
  return (
    <div className="card w-full bg-base-200 shadow-xl card-normal">
      <div className="card-body">
        <h2 className=" text-base-content card-title">Pizza Id: {pizzaId}</h2>
        <p>
          {" "}
          <span className="text-base-content"> Pizza Price: </span> {pizzaPrice}{" "}
          ${" "}
        </p>

        <p>
          {" "}
          <span className="text-base-content"> Pizza Name: </span> {pizzaName}
        </p>
      </div>
    </div>
  );
}

function AddPizzaForm({ handlePizzaddChange }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [pizzadd, setPizzadd] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/pizza", {
        method: "POST",
        body: JSON.stringify({ name, price }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setName("");
      setPrice("");
      handlePizzaddChange(true);
      window.my_modal_5.close();
    } catch (error) {
      console.error("Error adding pizza", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card w-full shadow-xl card-normal">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <h2 className="text-base-content card-title">Add New Pizza</h2>
            <label className="label">
              <span className="label-text">Pizza Name</span>
            </label>
            <input
              type="text"
              placeholder="Pizza Name"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pizza Price</span>
            </label>
            <input
              type="number"
              placeholder="Pizza Price"
              className="input input-bordered"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Add Pizza"
              className="btn btn-primary btn-sm"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Pizza;
