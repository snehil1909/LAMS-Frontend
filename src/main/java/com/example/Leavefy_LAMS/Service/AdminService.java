package com.example.Leavefy_LAMS.Service;



import com.example.Leavefy_LAMS.DTO.UpdateUserDTO;
import com.example.Leavefy_LAMS.DTO.UserDTO;
import com.example.Leavefy_LAMS.Exception.ResourceNotFoundException;
import com.example.Leavefy_LAMS.Model.Country;
import com.example.Leavefy_LAMS.Model.Department;
import com.example.Leavefy_LAMS.Model.Role;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CountryRepository countryRepository;

    @Autowired
    public AdminService(
            AdminRepository adminRepository,
            DepartmentRepository departmentRepository,
            RoleRepository roleRepository,
            UserRepository userRepository,
            CountryRepository countryRepository) {
        this.adminRepository = adminRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
    }

    public User createUser(UserDTO userDTO) {
        // Create new user object
        User user = new User();
        user.setEmployeeId(userDTO.getEmployeeId());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        // Fetch and set department
        Department department = departmentRepository.findById(userDTO.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        user.setDepartment(department);

        // Fetch and set supervisor
        User supervisor = userRepository.findById(userDTO.getSupervisorId())
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));
        user.setSupervisor(supervisor);

        // Fetch and set role
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        user.setRole(role);

        // Fetch and set country
        Country country = countryRepository.findById(userDTO.getCountryId())
                .orElseThrow(() -> new ResourceNotFoundException("Country not found"));
        user.setCountry(country);

        return adminRepository.save(user);
    }

    // Other methods remain the same...


    // Rest of your service methods...


    public List<User> getUsersBySupervisor(Long supervisorId) {
        return adminRepository.findBySupervisorUserId(supervisorId);
    }

    public List<User> getUsersByRole(Long roleId) {
        return adminRepository.findByRoleRoleId(roleId);
    }

    public List<User> getUsersByDepartment(Long departmentId) {
        return adminRepository.findByDepartmentDepartmentId(departmentId);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return adminRepository.findById(id);
    }

    public void deleteUser(Long id) {
        adminRepository.deleteById(id);
    }

    public boolean deleteUserByEmployeeId(String employeeId) {
        Optional<User> userOptional = adminRepository.findByEmployeeId(employeeId);
        if (userOptional.isPresent()) {
            adminRepository.delete(userOptional.get());
            return true;
        }
        return false;
    }
    public User getUserByEmployeeId(String employeeId) {
        return adminRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User updateUser(Long id, UpdateUserDTO updateUserDTO) {
        User existingUser = getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Update basic fields
        existingUser.setEmployeeId(updateUserDTO.getEmployeeId());
        existingUser.setFirstName(updateUserDTO.getFirstName());
        existingUser.setLastName(updateUserDTO.getLastName());
        existingUser.setEmail(updateUserDTO.getEmail());

        // Update password if provided
        if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()) {
            existingUser.setPassword(updateUserDTO.getPassword());
        }

        // Update department if provided
        if (updateUserDTO.getDepartmentId() != null) {
            Department department = departmentRepository.findById(updateUserDTO.getDepartmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
            existingUser.setDepartment(department);
        }

        // Update supervisor if provided
        if (updateUserDTO.getSupervisorId() != null) {
            User supervisor = userRepository.findById(updateUserDTO.getSupervisorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));
            existingUser.setSupervisor(supervisor);
        }

        // Update role if provided
        if (updateUserDTO.getRoleId() != null) {
            Role role = roleRepository.findById(updateUserDTO.getRoleId())
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
            existingUser.setRole(role);
        }

        return adminRepository.save(existingUser);
    }

//    public User createUser(User user) {
//        Department department = departmentRepository.findById(user.getDepartment().getDepartmentId())
//                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
//        user.setDepartment(department);
//
//        User supervisor = adminRepository.findById(user.getSupervisor().getUserId())
//                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));
//        user.setSupervisor(supervisor);
//
//        Role role = roleRepository.findById(user.getRole().getRoleId())
//                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
//        user.setRole(role);
//
//        return adminRepository.save(user);
//    }
//
  public List<User> getAllUsers() {
        return adminRepository.findAll();
    }

    // Add other methods as needed
}

