package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.Department;
import com.example.Leavefy_LAMS.Model.Role;
import com.example.Leavefy_LAMS.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(Long userId);
    Optional<User> findByEmployeeId(String employeeId);
    List<User> findBySupervisorUserId(Long supervisorId);
    List<User> findByDepartmentDepartmentId(Long departmentId);
    List<User> findByRoleRoleId(Long roleId);
    List<User> findBySupervisor(User supervisor);
    List<User> findByDepartment(Department department);
    List<User> findByRole(Role role);

    boolean existsByEmail(String email);
}