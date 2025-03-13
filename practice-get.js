import React, { useState, useEffect } from "react";
import axios from "axios";

const PracticeGetForm = () => {
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    role: "",
    dob: "",
    gender: "",
    email: "",
  });

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return ""; 
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/getpractice");
        setUsers(response.data.getpactice);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        alert("Error fetching data. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Handle edit function
  const handleEdit = (id, field, value) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  // Handle delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/deletepractice/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err.message);
      alert("Error deleting user. Please try again.");
    }
  };

  // Render the table
  return (
    <div className="container mt-5">
      <h2>User Table</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={user.first_name}
                  onChange={(e) => handleEdit(user.id, "first_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={user.last_name}
                  onChange={(e) => handleEdit(user.id, "last_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={user.role}
                  onChange={(e) => handleEdit(user.id, "role", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  value={formatDate(user.dob)} // Format the date
                  onChange={(e) => handleEdit(user.id, "dob", e.target.value)}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={user.gender}
                  onChange={(e) => handleEdit(user.id, "gender", e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </td>
              <td>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  onChange={(e) => handleEdit(user.id, "email", e.target.value)}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PracticeGetForm;