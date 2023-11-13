package com.fullstack.ecommerce.controllers;
import com.fullstack.ecommerce.entity.OrderItem;
import com.fullstack.ecommerce.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class CartController {
    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/api/pushedCartItem")
    public ResponseEntity<OrderItem> addToCart(@RequestBody OrderItem orderItem) {
        OrderItem savedOrderItem = cartService.addToCart(orderItem);
        return ResponseEntity.ok(savedOrderItem);
    }

    @GetMapping("/api/cart-items")
    public ResponseEntity<List<OrderItem>> getAllCartItems() {
        List<OrderItem> orderItems = cartService.getAllCartItems();
        return ResponseEntity.ok(orderItems);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
//        CartItem cartItem = cartService.getCartItemById(id);
//        if (cartItem != null) {
//            return ResponseEntity.ok(cartItem);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/api/updatedCartItem")
    public ResponseEntity<OrderItem> updateCartItem(@RequestBody OrderItem orderItem) {
        cartService.updateCartItem(orderItem);
        return ResponseEntity.ok(orderItem);
    }
    @PutMapping("/api/decrementCartItem")
    public ResponseEntity<OrderItem> decreaseCartItem(@RequestBody OrderItem orderItem) {
        cartService.decreaseCartItem(orderItem);
        return ResponseEntity.ok(orderItem);
    }

    @DeleteMapping("/api/deleteCartItem/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        cartService.deleteCartItem(id);
    }
}