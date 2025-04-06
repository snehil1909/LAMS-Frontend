package com.example.Leavefy_LAMS.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_name")
//    private String username;

    @Column(name = "employee_id", unique = true, nullable = false)
    private String employeeId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private Department department;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    @JsonBackReference(value = "supervisor")
    private User supervisor;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonBackReference
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<LeaveBalance> leaveBalances;

    @OneToMany(mappedBy = "user")
    private List<LeaveRequest> leaveRequests;

    @OneToMany(mappedBy = "user")
    private List<Attendance> attendances;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "user")
    private List<AuditLog> auditLogs;
}