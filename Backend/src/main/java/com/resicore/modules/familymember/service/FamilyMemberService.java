package com.resicore.modules.familymember.service;

import com.resicore.modules.familymember.dto.FamilyMemberRequestDTO;
import com.resicore.modules.familymember.dto.FamilyMemberResponseDTO;
import com.resicore.modules.familymember.dto.FamilyMemberSummaryDTO;
import com.resicore.modules.familymember.enums.FamilyMemberStatus;
import com.resicore.modules.familymember.enums.Relationship;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FamilyMemberService {
    FamilyMemberResponseDTO addFamilyMember(FamilyMemberRequestDTO requestDTO);
    FamilyMemberResponseDTO updateFamilyMember(String id, FamilyMemberRequestDTO requestDTO);
    void removeFamilyMember(String id);
    
    FamilyMemberResponseDTO getFamilyMemberById(String id);
    List<FamilyMemberSummaryDTO> getFamilyMembersByResident(String residentId);
    List<FamilyMemberSummaryDTO> getFamilyMembersByFlat(String flatId);
    
    Page<FamilyMemberSummaryDTO> searchFamilyMembers(String societyId, String buildingId, String flatId, String residentId, String keyword, FamilyMemberStatus status, Relationship relationship, int page, int size, String sortBy, String sortDir);
}
