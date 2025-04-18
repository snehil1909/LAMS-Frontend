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
import UpdateEmployeeComponent from './components/updateEmployeeComponent';
import SubmitLeaveRequestComponent from './components/submitLeaveRequestComponent';
import LeaveRequestsComponent from './components/LeaveRequestsComponent';
import EmployeeLayout from './components/EmployeeLayout';
import MarkAttendanceComponent from './components/MarkAttendanceComponent';
import SupervisorPage from './components/SupervisorPage';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* Admin/Public routes without side menu */}
          <Route path="/" element={<Login />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
          <Route path="/add-employee" element={<AddEmployeeComponent />} />
          <Route path="/delete-employee" element={<DeleteEmployeeComponent />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
          
          {/* Employee routes with side menu */}
          <Route path="/profile/:userId" element={
            <EmployeeLayout>
              <EmployeeProfile />
            </EmployeeLayout>
          } />
          <Route path="/submit-leave/:userId" element={
            <EmployeeLayout>
              <SubmitLeaveRequestComponent />
            </EmployeeLayout>
          } />
          <Route path="/leave-requests/:userId" element={
            <EmployeeLayout>
              <LeaveRequestsComponent />
            </EmployeeLayout>
          } />
          {/* Add route for mark attendance when you create that component */}
          <Route path="/mark-attendance/:userId" element={
            <EmployeeLayout>
              <MarkAttendanceComponent />
            </EmployeeLayout>
          } />
          <Route path="/supervisor/:supervisorId" element={
            <EmployeeLayout>
              <SupervisorPage />
            </EmployeeLayout>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
