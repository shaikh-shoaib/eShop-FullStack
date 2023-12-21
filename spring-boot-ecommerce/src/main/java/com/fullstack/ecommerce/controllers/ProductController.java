package com.fullstack.ecommerce.controllers;

import com.fullstack.ecommerce.aop.LogExecutionTime;
import com.fullstack.ecommerce.entity.Product;
import com.fullstack.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:4200")
public class ProductController {
    private ProductRepository productRepository;
    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @LogExecutionTime
    @GetMapping
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @LogExecutionTime
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable("id") Long id) {
        return productRepository.findById(id);
    }

    @LogExecutionTime
    @GetMapping("/category/{id}")
    public Page<Product> getProductsByCategoryId(@PathVariable("id") Long id, Pageable pageable) {
        return productRepository.findByCategoryId(id, pageable);
    }

    @LogExecutionTime
    @GetMapping("/search")
    public Page<Product> searchProductsByName(@RequestParam("name") String name, Pageable pageable) {
        return productRepository.findByNameContaining(name, pageable);
    }
}
