package com.example.Leavefy_LAMS.Controller;

import com.example.Leavefy_LAMS.DTO.EmployeeProfileDTO;
import com.example.Leavefy_LAMS.DTO.LeaveBalanceDTO;
import com.example.Leavefy_LAMS.DTO.LeaveRequestResponseDTO;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Service.HRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hr")
@CrossOrigin("*")
public class HRController {
    @Autowired
    private HRService hrService;

    @GetMapping("/{hrSupervisorId}/employees")
    public ResponseEntity<List<EmployeeProfileDTO>> getEmployees(@PathVariable Long hrSupervisorId) {
        List<User> employees = hrService.getEmployeesUnderSupervisor(hrSupervisorId);
        List<EmployeeProfileDTO> dtos = employees.stream()
                .map(this::convertToEmployeeDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{hrSupervisorId}/employees/{employeeId}/attendance")
    public ResponseEntity<Map<String, String>> getEmployeeAttendance(
            @PathVariable Long hrSupervisorId,
            @PathVariable String employeeId,
            @RequestParam int year,
            @RequestParam int month) {
        User employee = hrService.getEmployeeDetails(hrSupervisorId, employeeId);
        return ResponseEntity.ok(
                hrService.getEmployeeAttendanceHistory(hrSupervisorId, employee.getUserId(), year, month)
        );
    }

    @GetMapping("/{hrSupervisorId}/employees/{employeeId}/leave-balance")
    public ResponseEntity<List<LeaveBalanceDTO>> getEmployeeLeaveBalance(
            @PathVariable Long hrSupervisorId,
            @PathVariable String employeeId) {
        User employee = hrService.getEmployeeDetails(hrSupervisorId, employeeId);
        return ResponseEntity.ok(
                hrService.getEmployeeLeaveBalance(hrSupervisorId, employee.getUserId())
        );
    }

    @GetMapping("/{hrSupervisorId}/employees/{employeeId}/leave-history")
    public ResponseEntity<List<LeaveRequestResponseDTO>> getEmployeeLeaveHistory(
            @PathVariable Long hrSupervisorId,
            @PathVariable String employeeId) {
        User employee = hrService.getEmployeeDetails(hrSupervisorId, employeeId);
        return ResponseEntity.ok(
                hrService.getEmployeeLeaveHistory(hrSupervisorId, employee.getUserId())
        );
    }

    private EmployeeProfileDTO convertToEmployeeDTO(User user) {
        EmployeeProfileDTO dto = new EmployeeProfileDTO();
        dto.setUserId(user.getUserId());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setDepartment(user.getDepartment().getDepartmentName());
        if (user.getSupervisor() != null) {
            dto.setSupervisorName(user.getSupervisor().getFirstName() + " "
                    + user.getSupervisor().getLastName());
        }
        return dto;
    }
}