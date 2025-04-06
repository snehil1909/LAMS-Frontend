package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Add custom query methods if needed

}