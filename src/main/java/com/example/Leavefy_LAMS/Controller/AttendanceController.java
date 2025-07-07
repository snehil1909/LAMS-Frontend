//package com.example.Leavefy_LAMS.Controller;
//
//import com.example.Leavefy_LAMS.DTO.AttendanceMarkDTO;
//import com.example.Leavefy_LAMS.Model.Attendance;
//import com.example.Leavefy_LAMS.Service.AttendanceService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDate;
//
//@RestController
//@RequestMapping("/api/attendance")
//public class AttendanceController {
//    @Autowired
//    private AttendanceService attendanceService;
//
//    @PostMapping("/mark/{userId}")
//    public ResponseEntity<?> markAttendance(
//            @PathVariable Long userId,
//            @RequestBody AttendanceMarkDTO attendanceDTO) {
//        try {
//            Attendance attendance = attendanceService.markAttendance(userId);
//            return ResponseEntity.ok(attendance);
//        } catch (IllegalStateException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    @GetMapping("/{userId}/status")
//    public ResponseEntity<?> getAttendanceStatus(
//            @PathVariable Long userId,
//            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
//        return ResponseEntity.ok(attendanceService.getAttendanceStatus(userId, date));
//    }
//}
package com.example.Leavefy_LAMS.Controller;

import com.example.Leavefy_LAMS.DTO.AttendanceResponseDTO;
import com.example.Leavefy_LAMS.Model.Attendance;
import com.example.Leavefy_LAMS.Service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/employee")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/{userId}/attendance/mark")
    public ResponseEntity<?> markAttendance(@PathVariable Long userId) {
        try {
            Attendance attendance = attendanceService.markAttendance(userId);
            AttendanceResponseDTO response = convertToDTO(attendance);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private AttendanceResponseDTO convertToDTO(Attendance attendance) {
        AttendanceResponseDTO dto = new AttendanceResponseDTO();
        dto.setId(attendance.getAttendanceId());
        dto.setUserId(attendance.getUser().getUserId());
        dto.setEmployeeName(attendance.getUser().getFirstName() + " " + attendance.getUser().getLastName());
        dto.setDate(attendance.getDate());
        dto.setCheckIn(attendance.getCheckIn());
        dto.setStatus(attendance.getStatus());
        return dto;
    }
}