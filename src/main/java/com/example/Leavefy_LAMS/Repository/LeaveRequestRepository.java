package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.LeaveRequest;
import com.example.Leavefy_LAMS.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUser(User user);
    Optional<LeaveRequest> findByRequestIdAndUserUserId(Long requestId, Long userId);
}
