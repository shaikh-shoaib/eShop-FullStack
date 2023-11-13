package com.fullstack.ecommerce.services;

import com.fullstack.ecommerce.entity.OrderItem;
import com.fullstack.ecommerce.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }
    @Override
    public OrderItem addToCart(OrderItem orderItem) {
        return cartRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> getAllCartItems() {
        return cartRepository.findAll();
    }

//    @Override
//    public CartItem getCartItemById(Long id) {
//        return cartRepository.findById(id).orElse(null);
//    }

    @Override
    public void updateCartItem(OrderItem orderItem) {
        OrderItem existingOrderItem = cartRepository.findById(orderItem.getId()).orElse(null);
        existingOrderItem.setQuantity(orderItem.getQuantity()+1);
        cartRepository.save(existingOrderItem);
    }

    @Override
    public void deleteCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public void decreaseCartItem(OrderItem orderItem) {
        OrderItem existingOrderItem = cartRepository.findById(orderItem.getId()).orElse(null);
        if(existingOrderItem.getQuantity()>1){
            existingOrderItem.setQuantity(orderItem.getQuantity()-1);
            cartRepository.save(existingOrderItem);
        }
        else
            deleteCartItem(orderItem.getId());
    }
}
