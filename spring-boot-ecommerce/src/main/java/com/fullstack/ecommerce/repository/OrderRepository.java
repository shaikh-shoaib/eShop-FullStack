package com.fullstack.ecommerce.repository;

import com.fullstack.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

//    @Query(value = "SELECT * FROM orders LEFT OUTER JOIN customer ON orders.customer_id = customer.id WHERE customer.email=?", nativeQuery = true)
    List<Order> findByCustomerEmail(@Param("email") String email);
}
