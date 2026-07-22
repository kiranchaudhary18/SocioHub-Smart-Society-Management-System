package com.resicore.modules.community.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteRequestDTO {

    @NotEmpty(message = "You must select at least one option")
    private List<String> selectedOptionIds;
}
