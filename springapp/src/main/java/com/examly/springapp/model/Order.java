package com.examly.springapp.model;

import java.util.Date;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
public void setId(Long id) {
        this.id = id;
    }
    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    public void setShippingStatus(String shippingStatus) {
        this.shippingStatus = shippingStatus;
    }
public Long getId() {
        return id;
    }
    public Date getOrderDate() {
        return orderDate;
    }
    public String getPaymentStatus() {
        return paymentStatus;
    }
    public String getShippingStatus() {
        return shippingStatus;
    }
public Order() {
    }
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private Date orderDate;
private String paymentStatus;
private String shippingStatus;    
}
