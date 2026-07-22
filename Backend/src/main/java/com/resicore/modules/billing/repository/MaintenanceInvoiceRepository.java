package com.resicore.modules.billing.repository;

import com.resicore.modules.billing.entity.MaintenanceInvoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MaintenanceInvoiceRepository extends MongoRepository<MaintenanceInvoice, String>, CustomMaintenanceInvoiceRepository {

    Optional<MaintenanceInvoice> findByIdAndIsDeletedFalse(String id);
    
    boolean existsByFlatIdAndBillingMonthAndBillingYearAndIsDeletedFalse(String flatId, Integer billingMonth, Integer billingYear);
}
