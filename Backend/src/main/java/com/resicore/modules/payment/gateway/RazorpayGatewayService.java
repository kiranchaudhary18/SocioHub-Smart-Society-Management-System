package com.resicore.modules.payment.gateway;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentGateway;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class RazorpayGatewayService implements PaymentGatewayStrategy {

    @Override
    public PaymentGateway getGatewayType() {
        return PaymentGateway.RAZORPAY;
    }

    @Override
    public String initiatePayment(Payment payment) {
        log.info("Initiating Razorpay transaction for payment: {}", payment.getPaymentNumber());
        // In a real scenario, we would call Razorpay Client to generate an Order ID
        return "order_" + UUID.randomUUID().toString().substring(0, 14);
    }

    @Override
    public boolean verifyPayment(Payment payment, String gatewayTransactionId, String signature) {
        log.info("Verifying Razorpay transaction: {}", gatewayTransactionId);
        // In a real scenario, verify signature against razorpay secret
        return true; 
    }

    @Override
    public boolean processRefund(Payment payment, Double refundAmount, String reason) {
        log.info("Processing Razorpay refund for: {}, Amount: {}", payment.getTransactionId(), refundAmount);
        // In a real scenario, call Razorpay refund API
        return true;
    }
}
