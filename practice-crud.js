import React, { useState } from "react";
import axios from "axios";

const PracticeForm = () => {
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    role: "",
    dob: "",
    gender: "",
    email: "",
  });

  const handleAdd = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
    };
    setUsers([...users, user]);
    setNewUser({
      first_name: "",
      last_name: "",
      role: "",
      dob: "",
      gender: "",
      email: "",
    });
  };

  const handleEdit = (id, field, value) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSubmit = async () => {
    try {
      // Validate that all required fields are filled
      if (
        !newUser.first_name ||
        !newUser.last_name ||
        !newUser.role ||
        !newUser.dob ||
        !newUser.gender ||
        !newUser.email
      ) {
        alert("Please fill all required fields.");
        return;
      }

      // Send the newUser object to the backend
      const response = await axios.post("http://localhost:4000/api/v1/addpracticedoc", newUser);
      console.log("Data submitted successfully:", response.data);
      alert("Data submitted successfully!");

      // Clear the form after submission
      setNewUser({
        first_name: "",
        last_name: "",
        role: "",
        dob: "",
        gender: "",
        email: "",
      });
    } catch (err) {
      console.error("Error submitting data:", err.message);
      alert("Error submitting data. Please try again.");
    }
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
                  value={user.dob}
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
          <tr>
            <td>#</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              />
            </td>
            <td>
              <input
                type="date"
                className="form-control"
                value={newUser.dob}
                onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
              />
            </td>
            <td>
              <select
                className="form-control"
                value={newUser.gender}
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </td>
            <td>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </td>
            <td>
              <button className="btn btn-sm btn-primary" onClick={handleAdd}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success mt-3" onClick={handleSubmit}>
        Submit Data
      </button>
    </div>
  );
};

export default PracticeForm;