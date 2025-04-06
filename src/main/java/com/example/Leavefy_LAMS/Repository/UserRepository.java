package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Add custom query methods if needed
}