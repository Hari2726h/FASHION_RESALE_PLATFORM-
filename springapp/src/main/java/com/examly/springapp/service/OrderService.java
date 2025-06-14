package com.examly.springapp.service;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.OrderRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Order saveOrder(Order order, Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        order.setUser(user);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
// Add this in OrderService class
public Page<Order> getAllOrders(Pageable pageable) {
    return orderRepository.findAll(pageable);
}
    public List<Order> getAllConfirmedOrders() {
        return orderRepository.findByConfirmed(true);
    }

    public boolean deleteOrder(Long id) {
    if (orderRepository.existsById(id)) {
        orderRepository.deleteById(id);
        return true; // ✅ Successfully deleted
    } else {
        return false; // ❌ Order not found
    }
}


    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
public List<Order> getOrdersByUserId(Long userId) {
    return orderRepository.findByUserId(userId);
}

    public Order confirmOrder(Long id) {
        Order order = getOrderById(id);
        order.setConfirmed(true);
        return orderRepository.save(order);
    }
}
