package com.examly.springapp.controller;

import java.util.HashSet;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.Cart;
import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.service.CartService;
import com.examly.springapp.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    // ✅ Admin - View all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // ✅ Admin - Confirm an order
    @PutMapping("/{orderId}/confirm")
    public ResponseEntity<Order> confirmOrder(@PathVariable Long orderId) {
        Order confirmedOrder = orderService.confirmOrder(orderId);
        if (confirmedOrder == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(confirmedOrder);
    }

    // ✅ User - Place an order from cart

@PostMapping("/user/{userId}/place")
public ResponseEntity<Order> placeOrderFromCart(@PathVariable Long userId) {
    Cart cart = cartService.getOrCreateCart(userId);

    Set<ClothingItem> clothingItems = cart.getClothingItems();
    if (clothingItems == null || clothingItems.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    Order order = new Order();
    order.setUser(cart.getUser());

    // 🛠️ Fix: Clone the clothing items to avoid shared references
    order.setClothingItems(new HashSet<>(clothingItems));

    order.setOrderDate(new Date());
    order.setPaymentStatus("Pending");
    order.setShippingStatus("Pending");
    order.setConfirmed(false);

    Order savedOrder = orderService.saveOrder(order, userId);

    cartService.clearCart(userId); // ✅ Clear cart after placing order

    return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
}

    // ✅ User - View a specific order
    @GetMapping("/user/{userId}/{orderId}")
    public ResponseEntity<Order> getUserOrder(@PathVariable Long userId, @PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order == null || !order.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(order);
    }
    // ✅ User - Get all orders by user ID
@GetMapping("/user/{userId}")
public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
    List<Order> orders = orderService.getOrdersByUserId(userId);
    return ResponseEntity.ok(orders);
}


    // ✅ Admin or User - Delete an order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        boolean deleted = orderService.deleteOrder(orderId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.noContent().build();
    }
}
