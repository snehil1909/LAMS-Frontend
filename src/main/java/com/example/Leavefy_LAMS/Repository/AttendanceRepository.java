package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.Attendance;
import com.example.Leavefy_LAMS.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    boolean existsByUserAndDate(User user, LocalDate date);
    Optional<Attendance> findByUserAndDate(User user, LocalDate date);
    List<Attendance> findByUserAndDateBetweenOrderByDate(
            User user,
            LocalDate startDate,
            LocalDate endDate
    );
}
