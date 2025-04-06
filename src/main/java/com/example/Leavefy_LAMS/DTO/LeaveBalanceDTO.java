package com.example.Leavefy_LAMS.DTO;

import lombok.Data;

@Data
public class LeaveBalanceDTO {
    private Long leaveTypeId;
    private String leaveTypeName;
    private Integer totalDays;
    private Integer usedDays;
    private Integer remainingDays;
}
