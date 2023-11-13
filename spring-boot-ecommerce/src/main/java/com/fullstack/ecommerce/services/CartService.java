package com.fullstack.ecommerce.services;

import com.fullstack.ecommerce.entity.OrderItem;

import java.util.List;

public interface CartService {
    OrderItem addToCart(OrderItem orderItem);
    List<OrderItem> getAllCartItems();
//    CartItem getCartItemById(Long id);
    void updateCartItem(OrderItem orderItem);
    void deleteCartItem(Long id);

    void decreaseCartItem(OrderItem orderItem);
}
