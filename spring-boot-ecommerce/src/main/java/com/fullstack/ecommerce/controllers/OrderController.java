package com.fullstack.ecommerce.controllers;

import com.fullstack.ecommerce.entity.Order;
import com.fullstack.ecommerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("http://localhost:4200")
public class OrderController {

    private OrderRepository orderRepository;

    @Autowired
    OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/search")
    List<Order> getOrderByCustomerEmail(@RequestParam("email") String email) {
        return this.orderRepository.findByCustomerEmail(email);
    }
}
