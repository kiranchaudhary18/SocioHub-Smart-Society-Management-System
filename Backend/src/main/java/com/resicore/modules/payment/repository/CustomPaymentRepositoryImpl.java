package com.resicore.modules.payment.repository;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentGateway;
import com.resicore.modules.payment.enums.PaymentMethod;
import com.resicore.modules.payment.enums.PaymentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class CustomPaymentRepositoryImpl implements CustomPaymentRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Payment> searchPayments(String societyId, String residentId, String invoiceId, PaymentStatus status, PaymentGateway gateway, PaymentMethod method, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (residentId != null && !residentId.isBlank()) {
            query.addCriteria(Criteria.where("residentId").is(residentId));
        }
        
        if (invoiceId != null && !invoiceId.isBlank()) {
            query.addCriteria(Criteria.where("invoiceId").is(invoiceId));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (gateway != null) {
            query.addCriteria(Criteria.where("gateway").is(gateway));
        }
        
        if (method != null) {
            query.addCriteria(Criteria.where("paymentMethod").is(method));
        }

        if (startDate != null && endDate != null) {
            query.addCriteria(Criteria.where("createdAt").gte(startDate).lte(endDate));
        } else if (startDate != null) {
            query.addCriteria(Criteria.where("createdAt").gte(startDate));
        } else if (endDate != null) {
            query.addCriteria(Criteria.where("createdAt").lte(endDate));
        }

        if (keyword != null && !keyword.isBlank()) {
            Criteria keywordCriteria = new Criteria().orOperator(
                    Criteria.where("paymentNumber").regex(keyword, "i"),
                    Criteria.where("transactionId").regex(keyword, "i"),
                    Criteria.where("receiptNumber").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, Payment.class);
        query.with(pageable);
        List<Payment> payments = mongoTemplate.find(query, Payment.class);

        return new PageImpl<>(payments, pageable, total);
    }
}
