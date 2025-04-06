package com.example.Leavefy_LAMS.Controller;

import com.example.Leavefy_LAMS.DTO.EmployeeProfileDTO;
import com.example.Leavefy_LAMS.DTO.LeaveBalanceDTO;
import com.example.Leavefy_LAMS.DTO.LeaveRequestDTO;
import com.example.Leavefy_LAMS.DTO.LeaveRequestResponseDTO;
import com.example.Leavefy_LAMS.Model.LeaveBalance;
import com.example.Leavefy_LAMS.Model.LeaveRequest;
import com.example.Leavefy_LAMS.Model.LeaveType;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<EmployeeProfileDTO> getEmployeeProfile(@PathVariable Long userId) {
        User user = employeeService.getEmployeeProfile(userId);
        EmployeeProfileDTO profileDTO = new EmployeeProfileDTO();
        profileDTO.setUserId(user.getUserId());
        profileDTO.setEmployeeId(user.getEmployeeId());  // This is the string employee ID (E100)
        profileDTO.setFirstName(user.getFirstName());
        profileDTO.setLastName(user.getLastName());
        profileDTO.setEmail(user.getEmail());
        profileDTO.setDepartment(user.getDepartment().getDepartmentName());
        profileDTO.setSupervisorName(user.getSupervisor().getFirstName() + " " + user.getSupervisor().getLastName());
        return ResponseEntity.ok(profileDTO);
    }

    @GetMapping("/{userId}/leave-requests")
    public ResponseEntity<List<LeaveRequestResponseDTO>> getLeaveRequests(@PathVariable Long userId) {
        List<LeaveRequest> requests = employeeService.getEmployeeLeaveRequests(userId);
        List<LeaveRequestResponseDTO> responseDTOs = requests.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{userId}/leave-balance")
    public ResponseEntity<List<LeaveBalanceDTO>> getLeaveBalances(@PathVariable Long userId) {
        List<LeaveBalance> balances = employeeService.getLeaveBalances(userId);
        List<LeaveBalanceDTO> balanceDTOs = balances.stream()
                .map(this::convertToBalanceDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(balanceDTOs);
    }

    @GetMapping("/{userId}/leave-balance/{leaveTypeId}")
    public ResponseEntity<LeaveBalanceDTO> getLeaveBalanceByType(
            @PathVariable Long userId,
            @PathVariable Long leaveTypeId) {
        LeaveBalance balance = employeeService.getLeaveBalanceByType(userId, leaveTypeId);
        return ResponseEntity.ok(convertToBalanceDTO(balance));
    }

    @PostMapping("/{userId}/leave-request")
    public ResponseEntity<LeaveRequestResponseDTO> submitLeaveRequest(
            @PathVariable Long userId,
            @RequestBody LeaveRequestDTO leaveRequestDTO) {
        LeaveRequest request = new LeaveRequest();
        request.setStartDate(leaveRequestDTO.getStartDate());
        request.setEndDate(leaveRequestDTO.getEndDate());
        request.setReason(leaveRequestDTO.getReason());

        LeaveType leaveType = new LeaveType();
        leaveType.setLeaveTypeId(leaveRequestDTO.getLeaveTypeId());
        request.setLeaveType(leaveType);

        LeaveRequest submittedRequest = employeeService.submitLeaveRequest(userId, request);
        return ResponseEntity.ok(convertToResponseDTO(submittedRequest));
    }

    @PutMapping("/{userId}/leave-request/{requestId}/cancel")
    public ResponseEntity<LeaveRequestResponseDTO> cancelLeaveRequest(
            @PathVariable Long userId,
            @PathVariable Long requestId) {
        LeaveRequest cancelledRequest = employeeService.cancelLeaveRequest(userId, requestId);
        return ResponseEntity.ok(convertToResponseDTO(cancelledRequest));
    }

    private LeaveRequestResponseDTO convertToResponseDTO(LeaveRequest request) {
        LeaveRequestResponseDTO dto = new LeaveRequestResponseDTO();
        dto.setRequestId(request.getRequestId());
        dto.setLeaveType(request.getLeaveType().getLeaveTypeName());
        dto.setStartDate(request.getStartDate());
        dto.setEndDate(request.getEndDate());
        dto.setStatus(request.getStatus());
        dto.setReason(request.getReason());
        return dto;
    }

    private LeaveBalanceDTO convertToBalanceDTO(LeaveBalance balance) {
        LeaveBalanceDTO dto = new LeaveBalanceDTO();
        dto.setLeaveTypeId(balance.getLeaveType().getLeaveTypeId());
        dto.setLeaveTypeName(balance.getLeaveType().getLeaveTypeName());
        dto.setTotalDays(balance.getTotalDays());
        dto.setUsedDays(balance.getUsedDays());
        dto.setRemainingDays(balance.getRemainingDays());
        return dto;
    }
}