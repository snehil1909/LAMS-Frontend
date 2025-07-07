//package com.example.Leavefy_LAMS.Controller;
//
//
//
//import com.example.Leavefy_LAMS.DTO.UserDTO;
//import com.example.Leavefy_LAMS.DTO.UpdateUserDTO;
//import com.example.Leavefy_LAMS.Model.Country;
//import com.example.Leavefy_LAMS.Model.Department;
//import com.example.Leavefy_LAMS.Model.Role;
//import com.example.Leavefy_LAMS.Model.User;
//import com.example.Leavefy_LAMS.Service.AdminService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@CrossOrigin("*")
//@RequestMapping("/api/users")
//public class AdminController {
//
//    private final AdminService adminService;
//
//    @Autowired
//    public AdminController(AdminService adminService) {
//        this.adminService = adminService;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<UserDTO>> getAllUsers() {
//        List<User> users = adminService.getAllUsers();
//        List<UserDTO> userDTOs = users.stream()
//                .map(user -> {
//                    UserDTO dto = new UserDTO();
//                    dto.setUserId(user.getUserId());
//                    dto.setEmployeeId(user.getEmployeeId());
//                    dto.setFirstName(user.getFirstName());
//                    dto.setLastName(user.getLastName());
//                    dto.setEmail(user.getEmail());
//                    // Add other needed fields but avoid nested objects
//                    return dto;
//                })
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(userDTOs);
//    }
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUserById(@PathVariable Long id) {
//        return adminService.getUserById(id)
//                .map(user -> {
//                    UserDTO userDTO = new UserDTO();
//                    userDTO.setUserId(user.getUserId());
//                    userDTO.setEmployeeId(user.getEmployeeId());
//                    userDTO.setFirstName(user.getFirstName());
//                    userDTO.setLastName(user.getLastName());
//                    userDTO.setEmail(user.getEmail());
//                    // Don't include password
//
//                    if (user.getDepartment() != null) {
//                        userDTO.setDepartmentId(user.getDepartment().getDepartmentId());
//                       // userDTO.setDepartmentName(user.getDepartment().getDepartmentName());
//                    }
//
//                    if (user.getRole() != null) {
//                        userDTO.setRoleId(user.getRole().getRoleId());
//                       // userDTO.setRoleName(user.getRole().getRoleName());
//                    }
//
//                    if (user.getSupervisor() != null) {
//                        userDTO.setSupervisorId(user.getSupervisor().getUserId());
//                       // userDTO.setSupervisorName(user.getSupervisor().getFirstName() + " " + user.getSupervisor().getLastName());
//                    }
//
//
//                    return ResponseEntity.ok(userDTO);
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
//        User user = new User();
//        user.setEmployeeId(userDTO.getEmployeeId());
//        user.setFirstName(userDTO.getFirstName());
//        user.setLastName(userDTO.getLastName());
//        user.setEmail(userDTO.getEmail());
//        user.setPassword(userDTO.getPassword());
//
//        // Set references
//        Department department = new Department();
//        department.setDepartmentId(userDTO.getDepartmentId());
//        user.setDepartment(department);
//
//        User supervisor = new User();
//        supervisor.setUserId(userDTO.getSupervisorId());
//        user.setSupervisor(supervisor);
//
//        Role role = new Role();
//        role.setRoleId(userDTO.getRoleId());
//        user.setRole(role);
//
//        // Add country
//        Country country = new Country();
//        country.setCountryId(userDTO.getCountryId());
//        user.setCountry(country);
//
//        User createdUser = adminService.createUser(user);
//        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO updateUserDTO) {
//        return adminService.getUserById(id)
//                .map(existingUser -> {
//                    // Update user properties from DTO
//                    existingUser.setEmployeeId(updateUserDTO.getEmployeeId());
//                    existingUser.setFirstName(updateUserDTO.getFirstName());
//                    existingUser.setLastName(updateUserDTO.getLastName());
//                    existingUser.setEmail(updateUserDTO.getEmail());
//
//                    // Only update password if provided
//                    if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()) {
//                        existingUser.setPassword(updateUserDTO.getPassword());
//                    }
//
//                    // Update references if IDs are provided
//                    if (updateUserDTO.getDepartmentId() != null) {
//                        Department department = new Department();
//                        department.setDepartmentId(updateUserDTO.getDepartmentId());
//                        existingUser.setDepartment(department);
//                    }
//
//                    if (updateUserDTO.getSupervisorId() != null) {
//                        User supervisor = new User();
//                        supervisor.setUserId(updateUserDTO.getSupervisorId());
//                        existingUser.setSupervisor(supervisor);
//                    }
//
//                    if (updateUserDTO.getRoleId() != null) {
//                        Role role = new Role();
//                        role.setRoleId(updateUserDTO.getRoleId());
//                        existingUser.setRole(role);
//                    }
//
//                    User updatedUser = adminService.updateUser(existingUser);
//                    return ResponseEntity.ok(updatedUser);
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//        return adminService.getUserById(id)
//                .map(user -> {
//                    adminService.deleteUser(id);
//                    return ResponseEntity.noContent().<Void>build();
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @GetMapping("/department/{departmentId}")
//    public ResponseEntity<List<User>> getUsersByDepartment(@PathVariable Long departmentId) {
//        return ResponseEntity.ok(adminService.getUsersByDepartment(departmentId));
//    }
//
//    @GetMapping("/supervisor/{supervisorId}")
//    public ResponseEntity<List<User>> getUsersBySupervisor(@PathVariable Long supervisorId) {
//        return ResponseEntity.ok(adminService.getUsersBySupervisor(supervisorId));
//    }
//
//    @GetMapping("/role/{roleId}")
//    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Long roleId) {
//        return ResponseEntity.ok(adminService.getUsersByRole(roleId));
//    }
//}
//

package com.example.Leavefy_LAMS.Controller;

import com.example.Leavefy_LAMS.DTO.UserDTO;
import com.example.Leavefy_LAMS.DTO.UpdateUserDTO;
import com.example.Leavefy_LAMS.Exception.ResourceNotFoundException;
import com.example.Leavefy_LAMS.Model.Department;
import com.example.Leavefy_LAMS.Model.Role;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        List<UserDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return adminService.getUserById(id)
                .map(user -> ResponseEntity.ok(convertToDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{create}")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        User createdUser = adminService.createUser(userDTO);
        return new ResponseEntity<>(convertToDTO(createdUser), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO updateUserDTO) {
        try {
            User updatedUser = adminService.updateUser(id, updateUserDTO);
            return ResponseEntity.ok(convertToDTO(updatedUser));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<UserDTO>> getUsersByDepartment(@PathVariable Long departmentId) {
        List<User> users = adminService.getUsersByDepartment(departmentId);
        List<UserDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/supervisor/{supervisorId}")
    public ResponseEntity<List<UserDTO>> getUsersBySupervisor(@PathVariable Long supervisorId) {
        List<User> users = adminService.getUsersBySupervisor(supervisorId);
        List<UserDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<UserDTO>> getUsersByRole(@PathVariable Long roleId) {
        List<User> users = adminService.getUsersByRole(roleId);
        List<UserDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    // function to fetch all departments
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = adminService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = adminService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteUserByEmployeeId(@PathVariable String employeeId) {
        boolean deleted = adminService.deleteUserByEmployeeId(employeeId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());

        if (user.getDepartment() != null) {
            dto.setDepartmentId(user.getDepartment().getDepartmentId());
        }
        if (user.getRole() != null) {
            dto.setRoleId(user.getRole().getRoleId());
        }
        if (user.getSupervisor() != null) {
            dto.setSupervisorId(user.getSupervisor().getUserId());
        }
        if (user.getCountry() != null) {
            dto.setCountryId(user.getCountry().getCountryId());
        }

        return dto;
    }
}
