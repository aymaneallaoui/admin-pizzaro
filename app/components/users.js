"use client";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersResponse] = await Promise.all([
          fetch("/api/users").then((response) => response.json()),
        ]);
        setUsers(usersResponse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <span className="loading loading-ring loading-lg bg-primary flex items-center justify-center"></span>
      ) : (
        <>
          <div class="flex justify-center">
            <div class="stats shadow mb-4 px-10">
              <div class="stat stat-horizontal">
                <div class="stat-title">Total clients Number</div>
                <div class="stat-value">{users.length}</div>
                <div class="stat-desc">21% more than last month</div>
              </div>
            </div>
          </div>
          <Table users={users} />
        </>
      )}
    </div>
  );
}

function Table({ users }) {
  const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className=" overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>phone</th>
            <th>email</th>
            <th>address</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="hover" key={user.id}>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button
                  onClick={() => handleContactClick(user.email)}
                  className="btn btn-base-content"
                >
                  Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
