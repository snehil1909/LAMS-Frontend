package com.example.Leavefy_LAMS.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AttendanceResponseDTO {
    private Long id;
    private Long userId;
    private String employeeName;
    private LocalDate date;
    private LocalDateTime checkIn;
    private String status;
}
