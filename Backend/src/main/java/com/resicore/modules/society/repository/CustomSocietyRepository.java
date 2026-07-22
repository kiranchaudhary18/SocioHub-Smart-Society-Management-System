package com.resicore.modules.society.repository;

import com.resicore.modules.society.entity.Society;
import com.resicore.modules.society.enums.SocietyStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomSocietyRepository {
    Page<Society> searchSocieties(String keyword, SocietyStatus status, String city, String state, Pageable pageable);
}
