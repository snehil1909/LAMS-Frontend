package com.example.Leavefy_LAMS.Controller;

import com.example.Leavefy_LAMS.DTO.EmployeeProfileDTO;
import com.example.Leavefy_LAMS.DTO.LeaveRequestResponseDTO;
import com.example.Leavefy_LAMS.DTO.LeaveRequestStatusUpdateDTO;
import com.example.Leavefy_LAMS.Model.LeaveRequest;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/supervisor")
@CrossOrigin("*")
public class SupervisorController {
    @Autowired
    private SupervisorService supervisorService;

    // Get all pending leave requests for a supervisor
    @GetMapping("/{supervisorId}/leave-requests/pending")
    public ResponseEntity<List<LeaveRequestResponseDTO>> getPendingLeaveRequests(@PathVariable Long supervisorId) {
        List<LeaveRequest> pendingRequests = supervisorService.getPendingRequests(supervisorId);
        List<LeaveRequestResponseDTO> responseDTOs = pendingRequests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }
    // Get all employees under a supervisor

    // Get all employees under a supervisor
    @GetMapping("/{supervisorId}/employees")
    public ResponseEntity<List<EmployeeProfileDTO>> getSubordinates(@PathVariable Long supervisorId) {
        List<User> subordinates = supervisorService.getSubordinates(supervisorId);
        List<EmployeeProfileDTO> employeeDetails = subordinates.stream()
                .map(this::convertToEmployeeDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(employeeDetails);
    }

    // Get employee attendance history
    @GetMapping("/{supervisorId}/employees/{employeeId}/attendance")
    public ResponseEntity<Map<String, String>> getEmployeeAttendance(
            @PathVariable Long supervisorId,
            @PathVariable String employeeId,
            @RequestParam int year,
            @RequestParam int month) {
        User employee = supervisorService.getEmployeeDetails(supervisorId, employeeId);
        Map<String, String> attendanceHistory = supervisorService.getEmployeeAttendance(employee.getUserId(), year, month);
        return ResponseEntity.ok(attendanceHistory);
    }

    // Update leave request status (approve/reject)
    @PutMapping("/leave-requests/{requestId}/status")
    public ResponseEntity<LeaveRequestResponseDTO> updateLeaveRequestStatus(
            @PathVariable Long requestId,
            @RequestBody LeaveRequestStatusUpdateDTO statusUpdateDTO) {
        try {
            LeaveRequest updatedRequest = supervisorService.updateLeaveRequestStatus(requestId, statusUpdateDTO);
            return ResponseEntity.ok(convertToDTO(updatedRequest));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/{supervisorId}/employees/search/{employeeId}")
    public ResponseEntity<EmployeeProfileDTO> getEmployeeById(
            @PathVariable Long supervisorId,
            @PathVariable String employeeId) {
        User employee = supervisorService.getEmployeeDetails(supervisorId, employeeId);
        return ResponseEntity.ok(convertToEmployeeDTO(employee));
    }

    private LeaveRequestResponseDTO convertToDTO(LeaveRequest request) {
        LeaveRequestResponseDTO dto = new LeaveRequestResponseDTO();
        dto.setRequestId(request.getRequestId());
        dto.setLeaveType(request.getLeaveType().getLeaveTypeName());
        dto.setStartDate(request.getStartDate());
        dto.setEndDate(request.getEndDate());
        dto.setStatus(request.getStatus());
        dto.setReason(request.getReason());
        dto.setAppliedDate(request.getStartDate());  // You might want to add an appliedDate field to LeaveRequest
        User employee = request.getUser();
        dto.setEmployeeId(employee.getUserId());
        dto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());

        return dto;
    }

    private EmployeeProfileDTO convertToEmployeeDTO(User user) {
        EmployeeProfileDTO dto = new EmployeeProfileDTO();
        dto.setUserId(user.getUserId());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setDepartment(user.getDepartment().getDepartmentName());

        // Set supervisor name if supervisor exists
        if (user.getSupervisor() != null) {
            dto.setSupervisorName(user.getSupervisor().getFirstName() + " " + user.getSupervisor().getLastName());
        }

        return dto;
    }
}