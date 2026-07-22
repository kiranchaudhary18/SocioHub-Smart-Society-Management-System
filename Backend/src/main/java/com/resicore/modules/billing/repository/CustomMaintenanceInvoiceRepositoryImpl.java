package com.resicore.modules.billing.repository;

import com.resicore.modules.billing.entity.MaintenanceInvoice;
import com.resicore.modules.billing.enums.InvoiceStatus;
import com.resicore.modules.billing.enums.PaymentStatus;
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
public class CustomMaintenanceInvoiceRepositoryImpl implements CustomMaintenanceInvoiceRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<MaintenanceInvoice> searchInvoices(String societyId, String buildingId, String flatId, String residentId, Integer billingMonth, Integer billingYear, InvoiceStatus invoiceStatus, PaymentStatus paymentStatus, LocalDateTime startDate, LocalDateTime endDate, String keyword, Pageable pageable) {
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

        if (billingMonth != null) {
            query.addCriteria(Criteria.where("billingMonth").is(billingMonth));
        }

        if (billingYear != null) {
            query.addCriteria(Criteria.where("billingYear").is(billingYear));
        }

        if (invoiceStatus != null) {
            query.addCriteria(Criteria.where("invoiceStatus").is(invoiceStatus));
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
                    Criteria.where("invoiceNumber").regex(keyword, "i"),
                    Criteria.where("notes").regex(keyword, "i")
            );
            query.addCriteria(keywordCriteria);
        }

        long total = mongoTemplate.count(query, MaintenanceInvoice.class);
        query.with(pageable);
        List<MaintenanceInvoice> invoices = mongoTemplate.find(query, MaintenanceInvoice.class);

        return new PageImpl<>(invoices, pageable, total);
    }
}
