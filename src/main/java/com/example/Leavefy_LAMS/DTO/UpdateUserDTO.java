// src/main/java/com/example/Leavefy_LAMS/DTO/UpdateUserDTO.java
package com.example.Leavefy_LAMS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserDTO {
    private String employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long departmentId;
    private Long supervisorId;
    private Long roleId;
}