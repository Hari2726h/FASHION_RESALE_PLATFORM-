package com.examly.springapp.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date orderDate;

    private String paymentStatus;

    private String shippingStatus;

    private boolean confirmed = false; // New field to track order confirmation

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(
        name = "order_clothing_items",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "clothing_item_id")
    )
    private Set<ClothingItem> clothingItems = new HashSet<>();

    public Order() {}

    // Getters and setters

    public Long getId() { return id; }

    public Date getOrderDate() { return orderDate; }

    public void setOrderDate(Date orderDate) { this.orderDate = orderDate; }

    public String getPaymentStatus() { return paymentStatus; }

    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getShippingStatus() { return shippingStatus; }

    public void setShippingStatus(String shippingStatus) { this.shippingStatus = shippingStatus; }

    public boolean isConfirmed() { return confirmed; }

    public void setConfirmed(boolean confirmed) { this.confirmed = confirmed; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public Set<ClothingItem> getClothingItems() { return clothingItems; }

    public void setClothingItems(Set<ClothingItem> clothingItems) { this.clothingItems = clothingItems; }
}
