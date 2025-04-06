package com.example.Leavefy_LAMS.Service;



import com.example.Leavefy_LAMS.Exception.ResourceNotFoundException;
import com.example.Leavefy_LAMS.Model.Department;
import com.example.Leavefy_LAMS.Model.Role;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Repository.AdminRepository;
import com.example.Leavefy_LAMS.Repository.DepartmentRepository;
import com.example.Leavefy_LAMS.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository, DepartmentRepository departmentRepository, RoleRepository roleRepository) {
        this.adminRepository = adminRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
    }

    public List<User> getUsersBySupervisor(Long supervisorId) {
        return adminRepository.findBySupervisorUserId(supervisorId);
    }

    public List<User> getUsersByRole(Long roleId) {
        return adminRepository.findByRoleRoleId(roleId);
    }

    public List<User> getUsersByDepartment(Long departmentId) {
        return adminRepository.findByDepartmentDepartmentId(departmentId);
    }

    public Optional<User> getUserById(Long id) {
        return adminRepository.findById(id);
    }

    public void deleteUser(Long id) {
        adminRepository.deleteById(id);
    }

    public User updateUser(User user) {
        return adminRepository.save(user);
    }

    public User createUser(User user) {
        Department department = departmentRepository.findById(user.getDepartment().getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        user.setDepartment(department);

        User supervisor = adminRepository.findById(user.getSupervisor().getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found"));
        user.setSupervisor(supervisor);

        Role role = roleRepository.findById(user.getRole().getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        user.setRole(role);

        return adminRepository.save(user);
    }

    public List<User> getAllUsers() {
        return adminRepository.findAll();
    }

    // Add other methods as needed
}

