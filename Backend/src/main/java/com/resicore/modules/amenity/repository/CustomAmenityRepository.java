package com.resicore.modules.amenity.repository;

import com.resicore.modules.amenity.entity.Amenity;
import com.resicore.modules.amenity.enums.AmenityCategory;
import com.resicore.modules.amenity.enums.AmenityStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomAmenityRepository {
    Page<Amenity> searchAmenities(String societyId, AmenityCategory category, AmenityStatus status, String keyword, Pageable pageable);
}
