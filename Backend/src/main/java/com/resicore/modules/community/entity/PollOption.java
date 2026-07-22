package com.resicore.modules.community.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PollOption {
    
    @Builder.Default
    private String id = UUID.randomUUID().toString();
    
    private String text;
}
