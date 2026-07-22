package com.resicore.modules.complaint.repository;

import com.resicore.modules.complaint.entity.Complaint;
import com.resicore.modules.complaint.enums.ComplaintCategory;
import com.resicore.modules.complaint.enums.ComplaintPriority;
import com.resicore.modules.complaint.enums.ComplaintStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String>, CustomComplaintRepository {

    Optional<Complaint> findByIdAndIsDeletedFalse(String id);
    
    Optional<Complaint> findByComplaintNumberAndIsDeletedFalse(String complaintNumber);
    
    List<Complaint> findByResidentIdAndIsDeletedFalse(String residentId);
    
    List<Complaint> findByAssignedStaffIdAndIsDeletedFalse(String assignedStaffId);
    
    List<Complaint> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Complaint> findByBuildingIdAndIsDeletedFalse(String buildingId);
    
    List<Complaint> findByFlatIdAndIsDeletedFalse(String flatId);
    
    List<Complaint> findByStatusAndIsDeletedFalse(ComplaintStatus status);
    
    List<Complaint> findByPriorityAndIsDeletedFalse(ComplaintPriority priority);
    
    List<Complaint> findByCategoryAndIsDeletedFalse(ComplaintCategory category);
}
