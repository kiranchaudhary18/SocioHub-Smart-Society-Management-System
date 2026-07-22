package com.resicore.modules.flat.repository;

import com.resicore.modules.flat.entity.Flat;
import com.resicore.modules.flat.enums.FlatStatus;
import com.resicore.modules.flat.enums.FlatType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomFlatRepository {
    Page<Flat> searchFlats(String societyId, String buildingId, String keyword, FlatStatus status, FlatType flatType, Boolean isOccupied, Pageable pageable);
}
