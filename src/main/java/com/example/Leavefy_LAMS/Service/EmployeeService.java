package com.example.Leavefy_LAMS.Service;

import com.example.Leavefy_LAMS.Model.LeaveBalance;
import com.example.Leavefy_LAMS.Model.LeaveRequest;
import com.example.Leavefy_LAMS.Model.User;

import java.util.List;

public interface EmployeeService {
    User getEmployeeProfile(Long employeeId);
    LeaveRequest submitLeaveRequest(Long employeeId, LeaveRequest leaveRequest);
    List<LeaveRequest> getEmployeeLeaveRequests(Long employeeId);
    List<LeaveBalance> getLeaveBalances(Long employeeId);
    LeaveBalance getLeaveBalanceByType(Long employeeId, Long leaveTypeId);
    LeaveRequest cancelLeaveRequest(Long employeeId, Long requestId);
}
