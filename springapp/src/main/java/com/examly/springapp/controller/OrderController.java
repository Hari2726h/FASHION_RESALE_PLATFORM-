package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Order;

import com.examly.springapp.service.OrderService;


@RestController
@RequestMapping("api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrder(){
        return ResponseEntity.ok(orderService.getAllOrder());
    }

    @PostMapping
    public ResponseEntity<Order> createOder(@RequestBody Order order){
        return new ResponseEntity<>(orderService.SaveOrder(order),HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
            public ResponseEntity<Void> orderReview(@PathVariable Long id) {
                orderService.deleteOrder(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id,@RequestBody Order orderDetails){
      Order order=orderService.getOrderById(id);
       
      order.setOrderDate(orderDetails.getOrderDate());
      order.setPaymentStatus(orderDetails.getPaymentStatus());
      order.setShippingStatus(orderDetails.getShippingStatus());

      return ResponseEntity.ok(orderService.SaveOrder(order));
      

    }

}
