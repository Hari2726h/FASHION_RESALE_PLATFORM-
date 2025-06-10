package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "transactions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "transactions", "clothingItems"})
private User user;

@ManyToOne(fetch = FetchType.LAZY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user"})
private ClothingItem clothingItem;


    private Date transactionDate;

    private Double transactionAmount;

    private boolean confirmed = false;  // Admin confirms transaction

    public Transaction() {}

    public Transaction(Long id, User user, ClothingItem clothingItem, Date transactionDate, Double transactionAmount) {
        this.id = id;
        this.user = user;
        this.clothingItem = clothingItem;
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
    }

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public ClothingItem getClothingItem() { return clothingItem; }
    public void setClothingItem(ClothingItem clothingItem) { this.clothingItem = clothingItem; }

    public Date getTransactionDate() { return transactionDate; }
    public void setTransactionDate(Date transactionDate) { this.transactionDate = transactionDate; }

    public Double getTransactionAmount() { return transactionAmount; }
    public void setTransactionAmount(Double transactionAmount) { this.transactionAmount = transactionAmount; }

    public boolean isConfirmed() { return confirmed; }
    public void setConfirmed(boolean confirmed) { this.confirmed = confirmed; }
}
