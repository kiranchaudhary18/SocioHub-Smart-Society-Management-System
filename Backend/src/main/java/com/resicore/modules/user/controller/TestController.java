package com.resicore.modules.user.controller;

import com.resicore.common.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Temporary TestController for health checks.
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping
    public ApiResponse<Object> testEndpoint() {
        return ApiResponse.success("ResiCore Backend Running Successfully", null);
    }
}
