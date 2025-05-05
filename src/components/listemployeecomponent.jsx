import { useNavigate } from 'react-router-dom';
import './listemployeecomponent.css'; // Import the CSS file
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  listemployees,
  getEmployeesByDepartment,
  getEmployeesBySupervisor,
  getEmployeesByRole,
  getEmployeeByEmployeeId,
} from '../services/employeeservice';
import AdminViewProfile from './AdminViewProfile';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ListEmployeeComponent = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleViewProfile = (userId) => {
    setSelectedUserId(userId);
    setShowProfileModal(true);
  };
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [supervisorFilter, setSupervisorFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  // Fetch all employees and filter options on mount
  useEffect(() => {
    // Fetch all employees
    listemployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));

    // Fetch departments
    axios
      .get("http://192.168.47.133:5000/api/users/departments")
      .then((res) => setDepartments(res.data))
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      });

    // Fetch supervisors
    axios
      .get("http://192.168.47.133:5000/api/users")
      .then((res) => setSupervisors(res.data))
      .catch((error) => {
        console.error("Error fetching supervisors:", error);
        setSupervisors([]);
      });

    // Fetch roles
    axios
      .get("http://192.168.47.133:5000/api/users/roles")
      .then((res) => setRoles(res.data))
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setRoles([]);
      });
  }, []);

  // Handle filter changes
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setDepartmentFilter(value);
    if (value) {
      getEmployeesByDepartment(value)
        .then((res) => setEmployees(res.data))
        .catch((error) => {
          console.error("Error fetching employees by department:", error);
          setEmployees([]);
        });
    } else {
      listemployees().then((res) => setEmployees(res.data));
    }
  };

  const handleSupervisorChange = (e) => {
    const value = e.target.value;
    setSupervisorFilter(value);
    if (value) {
      getEmployeesBySupervisor(value)
        .then((res) => setEmployees(res.data))
        .catch((error) => {
          console.error("Error fetching employees by supervisor:", error);
          setEmployees([]);
        });
    } else {
      listemployees().then((res) => setEmployees(res.data));
    }
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
    if (value) {
      getEmployeesByRole(value)
        .then((res) => setEmployees(res.data))
        .catch((error) => {
          console.error("Error fetching employees by role:", error);
          setEmployees([]);
        });
    } else {
      listemployees().then((res) => setEmployees(res.data));
    }
  };

  // Handle search by employee ID
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      getEmployeeByEmployeeId(searchId.trim())
        .then((res) => {
          if (res.data) {
            // Use the userId from the response
            const userId = res.data.userId;
            setEmployees([res.data]); // Display the user in the table
          } else {
            alert("No employee found with the given Employee ID.");
            setEmployees([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching employee by Employee ID:", error);
          alert("Failed to fetch employee. Please try again.");
          setEmployees([]);
        });
    } else {
      listemployees().then((res) => setEmployees(res.data));
    }
  };


  // Define the addNewEmployee function
  const addNewEmployee = () => {
    navigate('/add-employee'); // Navigate to the "Add Employee" page
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://192.168.47.133:5000/api/users/${id}`) // Updated to match your DeleteMapping API path
        .then(() => {
          alert("Employee deleted successfully!");
          // Refresh the employee list
          listemployees()
            .then((response) => {
              setEmployees(response.data);
            })
            .catch((error) => {
              console.error('Error refreshing employee list:', error);
            });
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          alert("Failed to delete employee. Please try again.");
        });
    }
  };

  return (
    <div className='list-employee-component'>
        <div className='content-wrap'>
          <h2 className="text-center">List of Employees</h2>
          {/* Filters and Search */}
          <div className="filters-bar" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <select value={departmentFilter} onChange={handleDepartmentChange}>
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
              ))}
            </select>
            <select value={supervisorFilter} onChange={handleSupervisorChange}>
              <option value="">All Supervisors</option>
              {supervisors.map((s) => (
                <option key={s.userId} value={s.userId}>{s.firstName} {s.lastName}</option>
              ))}
            </select>
            <select value={roleFilter} onChange={handleRoleChange}>
              <option value="">All Roles</option>
              {roles.map((r) => (
                <option key={r.roleId} value={r.roleId}>{r.roleName}</option>
              ))}
            </select>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                placeholder="Search by Employee ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
          <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
            Add Employee
          </button>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId}>
                    
                  <td>{employee.employeeId}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="btn btn-info me-2"
                      onClick={() => handleViewProfile(employee.userId)}
                    >
                      View Profile
                    </button>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => navigate(`/update-employee/${employee.employeeId}`)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(employee.employeeId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminViewProfile
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            userId={selectedUserId}
          />
        </div>
      </div>
  );
};

export default ListEmployeeComponent;



