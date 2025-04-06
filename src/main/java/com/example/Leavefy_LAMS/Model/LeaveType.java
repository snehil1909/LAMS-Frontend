package com.example.Leavefy_LAMS.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "leave_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_type_id")
    private Long leaveTypeId;

    @Column(name = "leave_type_name", nullable = false, unique = true)
    private String leaveTypeName;

    @Column(name = "is_paid", nullable = false)
    private Boolean isPaid;

    @Column(name = "max_days")
    private Integer maxDays;

    @Column(name = "country_code")
    private String countryCode;

    @OneToMany(mappedBy = "leaveType")
    private List<LeaveBalance> leaveBalances;

    @OneToMany(mappedBy = "leaveType")
    private List<LeaveRequest> leaveRequests;
}
