package com.examly.springapp.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date orderDate;
    private String paymentStatus;
    private String shippingStatus;

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

    // Getters and setters...

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<ClothingItem> getClothingItems() {
        return clothingItems;
    }

    public void setClothingItems(Set<ClothingItem> clothingItems) {
        this.clothingItems = clothingItems;
    }
}
