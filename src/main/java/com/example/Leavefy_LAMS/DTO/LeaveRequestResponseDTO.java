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
}
