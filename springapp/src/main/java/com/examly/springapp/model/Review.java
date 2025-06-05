package com.examly.springapp.model;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date reviewDate;
    private String reviewText;
    private int rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothing_item_id")
    private ClothingItem clothingItem;

    public Review() {}

    public Review(Long id, Date reviewDate, String reviewText, int rating) {
        this.id = id;
        this.reviewDate = reviewDate;
        this.reviewText = reviewText;
        this.rating = rating;
    }

    // Getters and setters...

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ClothingItem getClothingItem() {
        return clothingItem;
    }

    public void setClothingItem(ClothingItem clothingItem) {
        this.clothingItem = clothingItem;
    }
}
