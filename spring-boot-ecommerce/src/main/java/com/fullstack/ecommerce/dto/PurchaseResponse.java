package com.fullstack.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {
    private String trackingNumber;
    public PurchaseResponse(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }
}
