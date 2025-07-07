// UserDTO.java
package com.example.Leavefy_LAMS.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long departmentId;
    private Long supervisorId;
    private Long roleId;
    private Long countryId;
}