package com.example.Leavefy_LAMS.Service;

//import com.example.Leavefy_LAMS.DTO.AttendanceMarkDTO;
import com.example.Leavefy_LAMS.Model.Attendance;

import java.time.LocalDate;
import java.util.Map;

public interface AttendanceService {
    Attendance markAttendance(Long userId);
    Attendance getAttendanceStatus(Long userId, LocalDate date);
    Map<String, String> getAttendanceHistory(Long userId, int year, int month);
}