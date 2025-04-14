import axios from "axios";

const REST_API_BASE_URL = 'http://192.168.47.134:5000/api/users';
const EMPLOYEE_API_BASE_URL = 'http://192.168.47.134:5000/api/employee';

export const listemployees = () => {
    return axios.get(REST_API_BASE_URL);
}

export const getEmployeeProfile = () => {
    return axios.get(EMPLOYEE_API_BASE_URL);
}

export const deleteEmployee = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/${id}`);
}

export const getEmployeesByDepartment = (departmentId) =>
    axios.get(`${REST_API_BASE_URL}/department/${departmentId}`);
  
export const getEmployeesBySupervisor = (supervisorId) =>
    axios.get(`${REST_API_BASE_URL}/supervisor/${supervisorId}`);
  
export const getEmployeesByRole = (roleId) =>
    axios.get(`${REST_API_BASE_URL}/role/${roleId}`);
  
export const getEmployeeByEmployeeId = (employeeId) =>
    axios.get(`${REST_API_BASE_URL}/${employeeId}`);