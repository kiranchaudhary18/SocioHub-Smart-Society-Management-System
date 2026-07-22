package com.resicore.modules.societyadmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportFilterRequestDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String format; // PDF, EXCEL, CSV
}
