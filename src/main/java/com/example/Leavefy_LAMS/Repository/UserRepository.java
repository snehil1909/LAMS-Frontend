package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Add custom query methods if needed
    List<User> findBySupervisorUserId(Long supervisorId);
    Optional<User> findByEmail(String email);
}