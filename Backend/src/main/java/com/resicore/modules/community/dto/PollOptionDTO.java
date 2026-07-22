package com.resicore.modules.community.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PollOptionDTO {
    private String id;
    
    @NotBlank(message = "Option text cannot be blank")
    private String text;
}
