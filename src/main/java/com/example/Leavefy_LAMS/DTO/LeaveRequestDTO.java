package com.example.Leavefy_LAMS.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LeaveRequestDTO {
    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private Long leaveTypeId;
}
