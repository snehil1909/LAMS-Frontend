//package com.example.Leavefy_LAMS.Service.Impl;
//
//import com.example.Leavefy_LAMS.DTO.AttendanceMarkDTO;
//import com.example.Leavefy_LAMS.Exception.ResourceNotFoundException;
//import com.example.Leavefy_LAMS.Model.Attendance;
//import com.example.Leavefy_LAMS.Model.User;
//import com.example.Leavefy_LAMS.Repository.AttendanceRepository;
//import com.example.Leavefy_LAMS.Repository.HolidayRepository;
//import com.example.Leavefy_LAMS.Repository.UserRepository;
//import com.example.Leavefy_LAMS.Service.AttendanceService;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.ZoneId;
//
//@Service
//@Transactional
//public class AttendanceServiceImpl implements AttendanceService {
//    @Autowired
//    private AttendanceRepository attendanceRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private HolidayRepository holidayRepository;
//
//    @Override
//    public Attendance markAttendance(Long userId, AttendanceMarkDTO dto) {
//        User user = userRepository.findById(userId)
//            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        // Check if it's a holiday
//        if (isHoliday(dto.getDate(), user.getCountry().getCountryName())) {
//            throw new IllegalStateException("Cannot mark attendance on a holiday");
//        }
//
//        // Check if attendance already marked for the day
//        if (attendanceRepository.existsByUserAndDate(user, dto.getDate())) {
//            throw new IllegalStateException("Attendance already marked for this date");
//        }
//
//        // Get current time in user's timezone
//        ZoneId userZone = getZoneId(dto.getTimeZone());
//        LocalDateTime currentTime = LocalDateTime.now(userZone);
//
//        // Check if within working hours (9 AM to 5 PM)
//        if (!isWithinWorkingHours(currentTime)) {
//            throw new IllegalStateException("Attendance can only be marked between 9 AM to 5 PM");
//        }
//
//        Attendance attendance = new Attendance();
//        attendance.setUser(user);
//        attendance.setDate(dto.getDate());
//        attendance.setCheckIn(currentTime);
//        attendance.setCheckInLocation(dto.getLocation());
//        attendance.setStatus("PRESENT");
//
//        return attendanceRepository.save(attendance);
//    }
//
//
//    private boolean isHoliday(LocalDate date, String countryName) {
//        return holidayRepository.existsByDateAndCountry_CountryName(date, countryName);
//    }
//    private boolean isWithinWorkingHours(LocalDateTime time) {
//        int hour = time.getHour();
//        return hour >= 9 && hour < 17;  // 9 AM to 5 PM
//    }
//
//    private ZoneId getZoneId(String timeZone) {
//        return switch (timeZone.toUpperCase()) {
//            case "IST" -> ZoneId.of("Asia/Kolkata");
//            case "GST" -> ZoneId.of("Asia/Dubai");
//            default -> throw new IllegalArgumentException("Unsupported timezone");
//        };
//    }
//
//    @Override
//    public Attendance getAttendanceStatus(Long userId, LocalDate date) {
//        User user = userRepository.findById(userId)
//            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        return attendanceRepository.findByUserAndDate(user, date)
//            .orElseThrow(() -> new ResourceNotFoundException("Attendance not found for date"));
//    }
//}
package com.example.Leavefy_LAMS.Service.Impl;

import com.example.Leavefy_LAMS.Exception.ResourceNotFoundException;
import com.example.Leavefy_LAMS.Model.Attendance;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Repository.AttendanceRepository;
import com.example.Leavefy_LAMS.Repository.HolidayRepository;
import com.example.Leavefy_LAMS.Repository.UserRepository;
import com.example.Leavefy_LAMS.Service.AttendanceService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HolidayRepository holidayRepository;

    @Override
    public Attendance markAttendance(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        LocalDate today = LocalDate.now();

        // Check if it's a holiday
        if (isHoliday(today, user.getCountry().getCountryName())) {
            throw new IllegalStateException("Cannot mark attendance on a holiday");
        }

        // Check if attendance already marked for today
        if (attendanceRepository.existsByUserAndDate(user, today)) {
            throw new IllegalStateException("Attendance already marked for today");
        }

        // Get current time in IST (default timezone)
        LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));

        // Check if within working hours (9 AM to 5 PM)
        if (!isWithinWorkingHours(currentTime)) {
            throw new IllegalStateException("Attendance can only be marked between 9 AM to 5 PM");
        }

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setDate(today);
        attendance.setCheckIn(currentTime);
        attendance.setStatus("PRESENT");

        return attendanceRepository.save(attendance);
    }

    private boolean isHoliday(LocalDate date, String countryName) {
        return holidayRepository.existsByDateAndCountry_CountryName(date, countryName);
    }

    private boolean isWithinWorkingHours(LocalDateTime time) {
        int hour = time.getHour();
        return hour >= 9 && hour < 17;  // 9 AM to 5 PM
    }

    @Override
    public Attendance getAttendanceStatus(Long userId, LocalDate date) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return attendanceRepository.findByUserAndDate(user, date)
            .orElseThrow(() -> new ResourceNotFoundException("Attendance not found for date"));

    }


        // ... existing code ...

        @Override
        public Map<String, String> getAttendanceHistory(Long userId, int year, int month) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            LocalDate startDate = LocalDate.of(year, month, 1);
            LocalDate endDate = startDate.plusMonths(1).minusDays(1);

            List<Attendance> attendances = attendanceRepository
                    .findByUserAndDateBetweenOrderByDate(user, startDate, endDate);

            Map<String, String> history = new HashMap<>();
            LocalDate current = startDate;

            while (!current.isAfter(endDate)) {
                history.put(current.toString(), "ABSENT");
                current = current.plusDays(1);
            }

            attendances.forEach(attendance ->
                    history.put(attendance.getDate().toString(), attendance.getStatus()));

            return history;
        }
    }
