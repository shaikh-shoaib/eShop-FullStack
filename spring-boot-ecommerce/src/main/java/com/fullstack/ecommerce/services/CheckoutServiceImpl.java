package com.fullstack.ecommerce.services;

import com.fullstack.ecommerce.dto.Purchase;
import com.fullstack.ecommerce.dto.PurchaseResponse;
import com.fullstack.ecommerce.entity.Address;
import com.fullstack.ecommerce.entity.Customer;
import com.fullstack.ecommerce.entity.Order;
import com.fullstack.ecommerce.entity.OrderItem;
import com.fullstack.ecommerce.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        // get order from dto
        Order order = purchase.getOrder();
        // generate tracking number
        String trackingNumber = getTrackingNumber();
        order.setTrackingNumber(trackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(orderItem -> order.add(orderItem));

        Address shippingAddress = purchase.getShippingAddress();
        order.setShippingAddress(shippingAddress);

        Customer customer = purchase.getCustomer();
        // check if the customer exists
        String email = customer.getEmail();

        Customer existingCustomer = customerRepository.findByEmail(email);

        if(existingCustomer != null) {
            customer = existingCustomer;
        }
        // add order to customer
        customer.add(order);
        // save to db
        customerRepository.save(customer);

        return new PurchaseResponse(trackingNumber);
    }

    private String getTrackingNumber() {
        String trackingNumber = UUID.randomUUID().toString();
        return trackingNumber;
    }
}
