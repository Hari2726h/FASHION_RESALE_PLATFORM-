package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each cart belongs to one user
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    // Cart contains many clothing items
    @ManyToMany
    @JoinTable(
        name = "cart_items",
        joinColumns = @JoinColumn(name = "cart_id"),
        inverseJoinColumns = @JoinColumn(name = "clothing_item_id")
    )
    private Set<ClothingItem> clothingItems = new HashSet<>();

    public Cart() {}

    public Cart(Long id, User user, Set<ClothingItem> clothingItems) {
        this.id = id;
        this.user = user;
        this.clothingItems = clothingItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
