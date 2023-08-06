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
        <Table users={users} />
      )}
    </div>
  );
}

function Table({ users }) {
  return (
    <div className=" table ">
      <table>
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>phone</th>
            <th>email</th>
            <th>address</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
