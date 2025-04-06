package com.example.Leavefy_LAMS.Controller;



import com.example.Leavefy_LAMS.DTO.UserDTO;
import com.example.Leavefy_LAMS.DTO.UpdateUserDTO;
import com.example.Leavefy_LAMS.Model.Department;
import com.example.Leavefy_LAMS.Model.Role;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return adminService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setEmployeeId(userDTO.getEmployeeId());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        // Set references
        Department department = new Department();
        department.setDepartmentId(userDTO.getDepartmentId());
        user.setDepartment(department);

        User supervisor = new User();
        supervisor.setUserId(userDTO.getSupervisorId());
        user.setSupervisor(supervisor);

        Role role = new Role();
        role.setRoleId(userDTO.getRoleId());
        user.setRole(role);

        User createdUser = adminService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO updateUserDTO) {
        return adminService.getUserById(id)
                .map(existingUser -> {
                    // Update user properties from DTO
                    existingUser.setEmployeeId(updateUserDTO.getEmployeeId());
                    existingUser.setFirstName(updateUserDTO.getFirstName());
                    existingUser.setLastName(updateUserDTO.getLastName());
                    existingUser.setEmail(updateUserDTO.getEmail());

                    // Only update password if provided
                    if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()) {
                        existingUser.setPassword(updateUserDTO.getPassword());
                    }

                    // Update references if IDs are provided
                    if (updateUserDTO.getDepartmentId() != null) {
                        Department department = new Department();
                        department.setDepartmentId(updateUserDTO.getDepartmentId());
                        existingUser.setDepartment(department);
                    }

                    if (updateUserDTO.getSupervisorId() != null) {
                        User supervisor = new User();
                        supervisor.setUserId(updateUserDTO.getSupervisorId());
                        existingUser.setSupervisor(supervisor);
                    }

                    if (updateUserDTO.getRoleId() != null) {
                        Role role = new Role();
                        role.setRoleId(updateUserDTO.getRoleId());
                        existingUser.setRole(role);
                    }

                    User updatedUser = adminService.updateUser(existingUser);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return adminService.getUserById(id)
                .map(user -> {
                    adminService.deleteUser(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<User>> getUsersByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(adminService.getUsersByDepartment(departmentId));
    }

    @GetMapping("/supervisor/{supervisorId}")
    public ResponseEntity<List<User>> getUsersBySupervisor(@PathVariable Long supervisorId) {
        return ResponseEntity.ok(adminService.getUsersBySupervisor(supervisorId));
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Long roleId) {
        return ResponseEntity.ok(adminService.getUsersByRole(roleId));
    }
}

