package com.resicore.modules.payment.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefundRequestDTO {

    @NotBlank(message = "Reason for refund is required")
    private String reason;

    @NotNull(message = "Refund amount is required")
    @Min(value = 1, message = "Refund amount must be greater than 0")
    private Double amount;
}
