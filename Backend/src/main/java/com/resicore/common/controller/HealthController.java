package com.resicore.common.controller;

import com.resicore.common.constant.AppConstants;
import com.resicore.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(AppConstants.ApiConstants.HEALTH_CHECK)
@RequiredArgsConstructor
public class HealthController {

    private final Environment env;
    private final MongoTemplate mongoTemplate;

    @GetMapping
    public ApiResponse<Map<String, Object>> getHealth() {
        Map<String, Object> healthInfo = new HashMap<>();
        
        // Application
        healthInfo.put("application", "ResiCore Backend API");
        healthInfo.put("version", "v1");
        
        // Server Time
        healthInfo.put("serverTime", LocalDateTime.now());
        
        // Environment
        String[] activeProfiles = env.getActiveProfiles();
        healthInfo.put("environment", activeProfiles.length > 0 ? activeProfiles[0] : "default");
        
        // Database
        try {
            mongoTemplate.executeCommand("{ ping: 1 }");
            healthInfo.put("database", "Connected");
        } catch (Exception e) {
            healthInfo.put("database", "Disconnected");
        }
        
        // Authentication
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            healthInfo.put("authentication", "Authenticated as " + auth.getName());
        } else {
            healthInfo.put("authentication", "Anonymous");
        }

        return ApiResponse.success("Health Check Successful", healthInfo);
    }
}
