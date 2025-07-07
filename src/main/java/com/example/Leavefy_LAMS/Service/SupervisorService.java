package com.example.Leavefy_LAMS.Service;

import com.example.Leavefy_LAMS.DTO.LeaveRequestStatusUpdateDTO;
import com.example.Leavefy_LAMS.Model.LeaveRequest;
import com.example.Leavefy_LAMS.Model.User;

import java.util.List;
import java.util.Map;

public interface SupervisorService {
    LeaveRequest updateLeaveRequestStatus(Long requestId, LeaveRequestStatusUpdateDTO statusDTO);
    List<LeaveRequest> getPendingRequests(Long supervisorId);
    List<User> getSubordinates(Long supervisorId);
    User getEmployeeDetails(Long supervisorId, String employeeId);
    Map<String, String> getEmployeeAttendance(Long userId, int year, int month);
}