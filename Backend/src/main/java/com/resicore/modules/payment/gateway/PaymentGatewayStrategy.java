package com.resicore.modules.payment.gateway;

import com.resicore.modules.payment.entity.Payment;
import com.resicore.modules.payment.enums.PaymentGateway;

public interface PaymentGatewayStrategy {
    PaymentGateway getGatewayType();
    
    String initiatePayment(Payment payment);
    
    boolean verifyPayment(Payment payment, String gatewayTransactionId, String signature);
    
    boolean processRefund(Payment payment, Double refundAmount, String reason);
}
