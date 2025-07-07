package com.example.Leavefy_LAMS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LeaveRequestStatusUpdateDTO {
    private String status;  // APPROVED or REJECTED
    private String comments;
    private Long supervisorId;
}
