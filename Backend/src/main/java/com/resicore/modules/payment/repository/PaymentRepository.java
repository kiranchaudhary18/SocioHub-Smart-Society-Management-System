package com.resicore.modules.payment.repository;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String>, CustomPaymentRepository {

    Optional<Payment> findByIdAndIsDeletedFalse(String id);
    
    Optional<Payment> findByTransactionIdAndIsDeletedFalse(String transactionId);
    
    Optional<Payment> findByReceiptNumberAndIsDeletedFalse(String receiptNumber);
    
    List<Payment> findByInvoiceIdAndIsDeletedFalse(String invoiceId);
    
    List<Payment> findByResidentIdAndIsDeletedFalse(String residentId);
    
    List<Payment> findBySocietyIdAndIsDeletedFalse(String societyId);
    
    List<Payment> findByStatusAndIsDeletedFalse(PaymentStatus status);
}
