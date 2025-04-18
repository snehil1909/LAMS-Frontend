import axios from "axios";

const REST_API_BASE_URL = 'http://192.168.47.133:5000/api/users';
const EMPLOYEE_API_BASE_URL = 'http://192.168.47.133:5000/api/employee';

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
  axios.get(`http://192.168.47.133:5000/api/users/department/${departmentId}`);

export const getEmployeesBySupervisor = (supervisorId) =>
  axios.get(`http://192.168.47.133:5000/api/users/supervisor/${supervisorId}`);

export const getEmployeesByRole = (roleId) =>
  axios.get(`http://192.168.47.133:5000/api/users/role/${roleId}`);
  
export const getEmployeeByEmployeeId = (employeeId) =>
    axios.get(`${REST_API_BASE_URL}/${employeeId}`);

export const getEmployeeById = (id) =>
  axios.get(`${REST_API_BASE_URL}/${id}`);

export const createEmployee = (employee) =>
  axios.post(`${REST_API_BASE_URL}/createUser`, employee);

export const updateEmployee = (id, employee) =>
  axios.put(`${REST_API_BASE_URL}/${id}`, employee);