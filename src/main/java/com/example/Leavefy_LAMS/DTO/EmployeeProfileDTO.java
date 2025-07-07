package com.example.Leavefy_LAMS.DTO;

import lombok.Data;

@Data
public class EmployeeProfileDTO {
    private Long userId;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String supervisorName;
}
