package com.examly.springapp.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
public Review(Long id, Date reviewDate, String reviewText, int rating) {
        this.id = id;
        this.reviewDate = reviewDate;
        this.reviewText = reviewText;
        this.rating = rating;
    }
public Review() {
    }
public void setId(Long id) {
        this.id = id;
    }
    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
public Long getId() {
        return id;
    }
    public Date getReviewDate() {
        return reviewDate;
    }
    public String getReviewText() {
        return reviewText;
    }
    public int getRating() {
        return rating;
    }
private Date reviewDate;
private String reviewText;
private int rating; 
}
