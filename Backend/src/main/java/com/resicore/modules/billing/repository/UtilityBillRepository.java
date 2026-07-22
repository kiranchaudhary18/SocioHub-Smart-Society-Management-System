package com.resicore.modules.billing.repository;

import com.resicore.modules.billing.entity.UtilityBill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilityBillRepository extends MongoRepository<UtilityBill, String>, CustomUtilityBillRepository {

    Optional<UtilityBill> findByIdAndIsDeletedFalse(String id);
}
