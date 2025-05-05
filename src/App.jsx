import './App.css';
import ListEmployeeComponent from './components/listemployeecomponent';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from './components/headercomponent';
import FooterComponent from './components/footercomponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployeeComponent from './components/addEmployeeComponent';
import DeleteEmployeeComponent from './components/deleteEmployeeComponent';
import EmployeeProfile from './components/EmployeeProfile';
import UpdateEmployeeComponent from './components/updateEmployeeComponent';
import SubmitLeaveRequestComponent from './components/submitLeaveRequestComponent';
import LeaveRequestsComponent from './components/LeaveRequestsComponent';
import EmployeeLayout from './components/EmployeeLayout';
import MarkAttendanceComponent from './components/MarkAttendanceComponent';
import SupervisorEmployeesPage from './components/SupervisorEmployeesPage';
import PendingLeaveRequestsPage from './components/PendingLeaveRequestsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminViewProfile from './components/AdminViewProfile';
import HREmployeeView from './components/HREmployeeView';


function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />

          {/* Admin routes */}
          <Route path="/employees" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
              <ListEmployeeComponent />
            </ProtectedRoute>
          } />
          <Route path="/add-employee" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
              <AddEmployeeComponent />
            </ProtectedRoute>
          } />
          <Route path="/delete-employee" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
              <DeleteEmployeeComponent />
            </ProtectedRoute>
          } />
          <Route path="/update-employee/:id" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
              <UpdateEmployeeComponent />
            </ProtectedRoute>
          } />
          <Route path="/admin/profile/:userId" element={
          <ProtectedRoute allowedRoles={['ADMIN', 'HR']}>
            <AdminViewProfile />
          </ProtectedRoute>
          } />

          {/* Employee routes */}
          <Route path="/profile/:userId" element={
            <ProtectedRoute allowedRoles={['EMPLOYEE', 'SUPERVISOR', 'HR']}>
              <EmployeeLayout>
                <EmployeeProfile />
              </EmployeeLayout>
            </ProtectedRoute>
          } />
          <Route path="/submit-leave/:userId" element={
            <ProtectedRoute allowedRoles={['EMPLOYEE', 'SUPERVISOR', 'HR']}>
              <EmployeeLayout>
                <SubmitLeaveRequestComponent />
              </EmployeeLayout>
            </ProtectedRoute>
          } />
          <Route path="/leave-requests/:userId" element={
            <ProtectedRoute allowedRoles={['EMPLOYEE', 'SUPERVISOR', 'HR']}>
              <EmployeeLayout>
                <LeaveRequestsComponent />
              </EmployeeLayout>
            </ProtectedRoute>
          } />
          <Route path="/mark-attendance/:userId" element={
            <ProtectedRoute allowedRoles={['EMPLOYEE',  'SUPERVISOR', 'HR']}>
              <EmployeeLayout>
                <MarkAttendanceComponent />
              </EmployeeLayout>
            </ProtectedRoute>
          } />

          {/* Supervisor routes */}
          <Route path="/supervisor/:supervisorId/employees" element={
            <ProtectedRoute allowedRoles={['SUPERVISOR']}>
              <EmployeeLayout>
                <SupervisorEmployeesPage />
              </EmployeeLayout>
            </ProtectedRoute>
          } />
          <Route path="/supervisor/:supervisorId/leave-requests/pending" element={
            <ProtectedRoute allowedRoles={['SUPERVISOR']}>
              <EmployeeLayout>
                <PendingLeaveRequestsPage />
              </EmployeeLayout>
            </ProtectedRoute>
          } />
          {/* HR routes */}
          <Route path="/hr/employees" element={
            <ProtectedRoute allowedRoles={['HR']}>
              <HREmployeeView />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;