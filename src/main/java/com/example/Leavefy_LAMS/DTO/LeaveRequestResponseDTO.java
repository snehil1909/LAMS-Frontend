package com.example.Leavefy_LAMS.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LeaveRequestResponseDTO {
    private Long requestId;
    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String reason;
    private LocalDate appliedDate;
    // Add employee details
    private Long employeeId;
   // This is the string employee ID (E100)
    private String employeeName;    // Concatenated first and last name

}
