import React, { useState, useEffect } from "react";
import axios from "axios";

const PracticeUpdateForm = () => {
  const [users, setUsers] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/getpractice");
        console.log("Fetched data:", response.data); // Log the response
        setUsers(response.data.getpactice); // Ensure this matches the backend response structure
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
        user._id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const handleUpdate = async (id) => {
    try {
      // Use _id instead of id to find the user
      const userToUpdate = users.find(user => user._id === id);
      console.log("userToUpdate", userToUpdate);

      if (!userToUpdate) {
        alert("User not found.");
        return;
      }

      // Ensure the id is set correctly
      userToUpdate.id = id; // This line is optional, depending on your backend requirements

      const response = await axios.post(
        `http://localhost:4000/api/v1/updatepractice`,
        userToUpdate
      );
      console.log("response", response);

      if (response.data.message === "User updated successfully") {
        alert("User updated successfully!");
      } else {
        alert("Failed to update user.");
      }
    } catch (err) {
      console.error("Error updating user:", err.message);
      alert("Error updating user. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={user.first_name}
                  onChange={(e) => handleEdit(user._id, "first_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={user.last_name}
                  onChange={(e) => handleEdit(user._id, "last_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={user.role}
                  onChange={(e) => handleEdit(user._id, "role", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  value={formatDate(user.dob)}
                  onChange={(e) => handleEdit(user._id, "dob", e.target.value)}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={user.gender}
                  onChange={(e) => handleEdit(user._id, "gender", e.target.value)}
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
                  onChange={(e) => handleEdit(user._id, "email", e.target.value)}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleUpdate(user._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PracticeUpdateForm;