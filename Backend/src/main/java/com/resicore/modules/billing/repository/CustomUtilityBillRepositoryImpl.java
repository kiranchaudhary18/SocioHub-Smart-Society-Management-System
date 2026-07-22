package com.resicore.modules.billing.repository;

import com.resicore.modules.billing.entity.UtilityBill;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
import com.resicore.modules.billing.enums.UtilityType;
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
public class CustomUtilityBillRepositoryImpl implements CustomUtilityBillRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<UtilityBill> searchUtilityBills(String societyId, String buildingId, String flatId, String residentId, UtilityType utilityType, Integer billingMonth, Integer billingYear, InvoiceStatus billStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable) {
        Query query = new Query();
        query.addCriteria(Criteria.where("isDeleted").is(false));

        if (societyId != null && !societyId.isBlank()) {
            query.addCriteria(Criteria.where("societyId").is(societyId));
        }

        if (buildingId != null && !buildingId.isBlank()) {
            query.addCriteria(Criteria.where("buildingId").is(buildingId));
        }

        if (flatId != null && !flatId.isBlank()) {
            query.addCriteria(Criteria.where("flatId").is(flatId));
        }

        if (residentId != null && !residentId.isBlank()) {
            query.addCriteria(Criteria.where("residentId").is(residentId));
        }
        
        if (utilityType != null) {
            query.addCriteria(Criteria.where("utilityType").is(utilityType));
        }

        if (billingMonth != null) {
            query.addCriteria(Criteria.where("billingMonth").is(billingMonth));
        }

        if (billingYear != null) {
            query.addCriteria(Criteria.where("billingYear").is(billingYear));
        }

        if (billStatus != null) {
            query.addCriteria(Criteria.where("billStatus").is(billStatus));
        }

        if (paymentStatus != null) {
            query.addCriteria(Criteria.where("paymentStatus").is(paymentStatus));
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
                    Criteria.where("utilityNumber").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, UtilityBill.class);
        query.with(pageable);
        List<UtilityBill> bills = mongoTemplate.find(query, UtilityBill.class);

        return new PageImpl<>(bills, pageable, total);
    }
}
