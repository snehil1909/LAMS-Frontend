package com.example.Leavefy_LAMS.Service.Impl;


import com.example.Leavefy_LAMS.Exception.ResourceNotFoundException;
import com.example.Leavefy_LAMS.Model.LeaveBalance;
import com.example.Leavefy_LAMS.Model.LeaveRequest;
import com.example.Leavefy_LAMS.Model.User;
import com.example.Leavefy_LAMS.Repository.LeaveBalanceRepository;
import com.example.Leavefy_LAMS.Repository.LeaveRequestRepository;
import com.example.Leavefy_LAMS.Repository.UserRepository;
import com.example.Leavefy_LAMS.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final UserRepository userRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    @Autowired
    public EmployeeServiceImpl(UserRepository userRepository,
                             LeaveRequestRepository leaveRequestRepository,
                             LeaveBalanceRepository leaveBalanceRepository) {
        this.userRepository = userRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    @Override
    public User getEmployeeProfile(Long employeeId) {
        return userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

    @Override
    @Transactional
    public LeaveRequest submitLeaveRequest(Long employeeId, LeaveRequest leaveRequest) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        LeaveBalance balance = leaveBalanceRepository
                .findByUserAndLeaveType(employee, leaveRequest.getLeaveType())
                .orElseThrow(() -> new ResourceNotFoundException("Leave balance not found"));

        long leaveDays = ChronoUnit.DAYS.between(leaveRequest.getStartDate(), leaveRequest.getEndDate()) + 1;

        if (balance.getRemainingDays() < leaveDays) {
            throw new IllegalStateException("Insufficient leave balance");
        }

        leaveRequest.setUser(employee);
        leaveRequest.setStatus("PENDING");
        return leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public List<LeaveRequest> getEmployeeLeaveRequests(Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return leaveRequestRepository.findByUser(employee);
    }

    @Override
    public List<LeaveBalance> getLeaveBalances(Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return leaveBalanceRepository.findByUser(employee);
    }

    @Override
    public LeaveBalance getLeaveBalanceByType(Long employeeId, Long leaveTypeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return leaveBalanceRepository.findByUserAndLeaveTypeLeaveTypeId(employee, leaveTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave balance not found"));
    }

    @Override
    @Transactional
    public LeaveRequest cancelLeaveRequest(Long employeeId, Long requestId) {
        LeaveRequest request = leaveRequestRepository.findByRequestIdAndUserUserId(requestId, employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        if (!"PENDING".equals(request.getStatus())) {
            throw new IllegalStateException("Only pending requests can be cancelled");
        }

        request.setStatus("CANCELLED");
        return leaveRequestRepository.save(request);
    }
}
