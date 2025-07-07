package com.example.Leavefy_LAMS.Service;

import com.example.Leavefy_LAMS.DTO.LeaveBalanceDTO;
import com.example.Leavefy_LAMS.DTO.LeaveRequestResponseDTO;
import com.example.Leavefy_LAMS.Model.User;

import java.util.List;
import java.util.Map;

public interface HRService {
    List<User> getEmployeesUnderSupervisor(Long hrSupervisorId);
    Map<String, String> getEmployeeAttendanceHistory(Long hrSupervisorId, Long employeeId, int year, int month);
    List<LeaveBalanceDTO> getEmployeeLeaveBalance(Long hrSupervisorId, Long employeeId);
    List<LeaveRequestResponseDTO> getEmployeeLeaveHistory(Long hrSupervisorId, Long employeeId);
    User getEmployeeDetails(Long hrSupervisorId, String employeeId);
}