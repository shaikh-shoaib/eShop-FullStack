package com.fullstack.ecommerce.dto;

import com.fullstack.ecommerce.entity.Address;
import com.fullstack.ecommerce.entity.OrderItem;
import com.fullstack.ecommerce.entity.Customer;
import com.fullstack.ecommerce.entity.Order;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
