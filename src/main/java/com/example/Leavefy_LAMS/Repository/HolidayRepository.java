package com.example.Leavefy_LAMS.Repository;

import com.example.Leavefy_LAMS.Model.Country;
import com.example.Leavefy_LAMS.Model.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    boolean existsByDateAndCountry_CountryName(LocalDate date, String countryName);
}
