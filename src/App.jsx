import './App.css';
import ListEmployeeComponent from './components/listemployeecomponent';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/headercomponent';
import FooterComponent from './components/footercomponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployeeComponent from './components/addEmployeeComponent';
import DeleteEmployeeComponent from './components/deleteEmployeeComponent';
import EmployeeProfile from './components/employeeProfile';
import UpdateEmployeeComponent from './components/updateEmployeeComponent'; // Import the new component
import SubmitLeaveRequestComponent from './components/submitLeaveRequestComponent'; // Import the new component
import LeaveRequestsComponent from './components/LeaveRequestsComponent'; // Import the new component

function App() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/delete-employee" element={<DeleteEmployeeComponent />} />
          <Route path="/profile/:userId" element={<EmployeeProfile />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} /> {/* New route */}
          <Route path="/submit-leave/:userId" element={<SubmitLeaveRequestComponent />} /> {/* New route */}
          <Route path="/leave-requests/:userId" element={<LeaveRequestsComponent />} /> {/* New route */}
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
