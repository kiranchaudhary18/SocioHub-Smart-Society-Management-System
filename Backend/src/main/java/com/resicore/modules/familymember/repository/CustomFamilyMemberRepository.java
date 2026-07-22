package com.resicore.modules.familymember.repository;

import com.resicore.modules.familymember.entity.FamilyMember;
import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomFamilyMemberRepository {
    Page<FamilyMember> searchFamilyMembers(String societyId, String buildingId, String flatId, String residentId, String keyword, FamilyMemberStatus status, Relationship relationship, Pageable pageable);
}
