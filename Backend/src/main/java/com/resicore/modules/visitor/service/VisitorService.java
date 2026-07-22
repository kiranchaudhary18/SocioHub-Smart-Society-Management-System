package com.resicore.modules.visitor.service;

import com.resicore.modules.visitor.dto.VisitorCheckInDTO;
import com.resicore.modules.visitor.dto.VisitorCheckOutDTO;
import com.resicore.modules.visitor.dto.VisitorRequestDTO;
import com.resicore.modules.visitor.dto.VisitorResponseDTO;
import com.resicore.modules.visitor.dto.VisitorSummaryDTO;
import com.resicore.modules.visitor.enums.Purpose;
import com.resicore.modules.visitor.enums.VisitorStatus;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitorService {
    VisitorResponseDTO createVisitorRequest(VisitorRequestDTO requestDTO);
    VisitorResponseDTO updateVisitor(String id, VisitorRequestDTO requestDTO);
    
    VisitorResponseDTO approveVisitor(String id);
    VisitorResponseDTO rejectVisitor(String id, String remarks);
    VisitorResponseDTO cancelVisitor(String id, String remarks);
    
    VisitorResponseDTO checkInVisitor(String id, VisitorCheckInDTO checkInDTO);
    VisitorResponseDTO checkOutVisitor(String id, VisitorCheckOutDTO checkOutDTO);
    
    VisitorResponseDTO getVisitorById(String id);
    VisitorResponseDTO getVisitorByCode(String visitorCode);
    
    List<VisitorSummaryDTO> getVisitorsByResident(String residentId);
    List<VisitorSummaryDTO> getVisitorsBySociety(String societyId);
    
    Page<VisitorSummaryDTO> searchVisitors(String societyId, String residentId, String buildingId, String flatId, String keyword, VisitorStatus status, Purpose purpose, LocalDateTime startDate, LocalDateTime endDate, int page, int size, String sortBy, String sortDir);
    
    void deleteVisitor(String id);
}
