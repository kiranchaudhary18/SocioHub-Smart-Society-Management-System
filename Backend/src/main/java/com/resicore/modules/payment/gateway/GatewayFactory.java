package com.resicore.modules.payment.gateway;

import com.resicore.modules.payment.enums.PaymentGateway;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class GatewayFactory {

    private final Map<PaymentGateway, PaymentGatewayStrategy> strategies;

    public GatewayFactory(List<PaymentGatewayStrategy> strategyList) {
        this.strategies = strategyList.stream()
                .collect(Collectors.toMap(PaymentGatewayStrategy::getGatewayType, Function.identity()));
    }

    public PaymentGatewayStrategy getStrategy(PaymentGateway gateway) {
        PaymentGatewayStrategy strategy = strategies.get(gateway);
        if (strategy == null) {
            throw new IllegalArgumentException("Unsupported payment gateway: " + gateway);
        }
        return strategy;
    }
}
