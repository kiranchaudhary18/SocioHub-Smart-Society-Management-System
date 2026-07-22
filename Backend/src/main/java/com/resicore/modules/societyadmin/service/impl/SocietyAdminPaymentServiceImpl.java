package com.resicore.modules.societyadmin.service.impl;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentStatus;
import com.resicore.modules.societyadmin.service.SocietyAdminPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocietyAdminPaymentServiceImpl implements SocietyAdminPaymentService {

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Payment> getOutstandingDues(String societyId, Pageable pageable) {
        // Find payments that are overdue or not PAID
        Query query = new Query(Criteria.where("societyId").is(societyId)
                .and("status").in(PaymentStatus.PENDING, PaymentStatus.FAILED)
                .and("dueDate").lt(LocalDate.now()));
        
        long count = mongoTemplate.count(query, Payment.class);
        query.with(pageable);
        List<Payment> payments = mongoTemplate.find(query, Payment.class);
        return new PageImpl<>(payments, pageable, count);
    }

    @Override
    public double getMonthlyCollection(String societyId, int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startOfMonth = yearMonth.atDay(1);
        LocalDate endOfMonth = yearMonth.atEndOfMonth();

        Query query = new Query(Criteria.where("societyId").is(societyId)
                .and("status").is(PaymentStatus.SUCCESS)
                .and("paymentDate").gte(startOfMonth.atStartOfDay()).lte(endOfMonth.atTime(23, 59, 59)));

        List<Payment> payments = mongoTemplate.find(query, Payment.class);
        return payments.stream().mapToDouble(p -> p.getAmount() != null ? p.getAmount().doubleValue() : 0.0).sum();
    }

    @Override
    public Page<Payment> getPendingPayments(String societyId, Pageable pageable) {
        Query query = new Query(Criteria.where("societyId").is(societyId)
                .and("status").is(PaymentStatus.PENDING));
        
        long count = mongoTemplate.count(query, Payment.class);
        query.with(pageable);
        List<Payment> payments = mongoTemplate.find(query, Payment.class);
        return new PageImpl<>(payments, pageable, count);
    }

    @Override
    public Object getPaymentStatistics(String societyId) {
        Query totalQuery = new Query(Criteria.where("societyId").is(societyId));
        long totalCount = mongoTemplate.count(totalQuery, Payment.class);
        
        Query pendingQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is(PaymentStatus.PENDING));
        long pendingCount = mongoTemplate.count(pendingQuery, Payment.class);
        
        Query successQuery = new Query(Criteria.where("societyId").is(societyId).and("status").is(PaymentStatus.SUCCESS));
        long successCount = mongoTemplate.count(successQuery, Payment.class);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPayments", totalCount);
        stats.put("pendingPayments", pendingCount);
        stats.put("successfulPayments", successCount);
        
        return stats;
    }

    @Override
    public Object getRevenueSummary(String societyId) {
        // Summarizes total successful collections
        Query query = new Query(Criteria.where("societyId").is(societyId).and("status").is(PaymentStatus.SUCCESS));
        List<Payment> payments = mongoTemplate.find(query, Payment.class);
        
        double totalRevenue = payments.stream().mapToDouble(p -> p.getAmount() != null ? p.getAmount().doubleValue() : 0.0).sum();
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("societyId", societyId);
        summary.put("totalRevenue", totalRevenue);
        return summary;
    }
}
