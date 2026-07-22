package com.resicore.modules.payment.gateway;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentGateway;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OfflineGatewayService implements PaymentGatewayStrategy {

    @Override
    public PaymentGateway getGatewayType() {
        return PaymentGateway.OFFLINE;
    }

    @Override
    public String initiatePayment(Payment payment) {
        log.info("Initiating Offline transaction for payment: {}", payment.getPaymentNumber());
        // No gateway setup required for offline cash/cheque
        return "OFFLINE_TX_" + System.currentTimeMillis();
    }

    @Override
    public boolean verifyPayment(Payment payment, String gatewayTransactionId, String signature) {
        log.info("Verifying Offline transaction manually (always true): {}", gatewayTransactionId);
        // Offline payments are verified at the moment of recording by the admin
        return true; 
    }

    @Override
    public boolean processRefund(Payment payment, Double refundAmount, String reason) {
        log.info("Processing Offline refund for: {}, Amount: {}", payment.getTransactionId(), refundAmount);
        // Handled manually via Cash/Cheque reverse entry
        return true;
    }
}
