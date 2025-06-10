package com.examly.springapp.controller;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Get all reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // Get all reviews for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getUserReviews(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }

    // Get a single review by ID
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = reviewService.getReviewById(id);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new review
    @PostMapping("/user/{userId}/item/{clothingItemId}")
    public ResponseEntity<Review> createReview(
            @PathVariable Long userId,
            @PathVariable Long clothingItemId,
            @RequestBody Review review
    ) {
        Review createdReview = reviewService.saveReview(review, userId, clothingItemId);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    // Update a review by ID
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        Review existingReview = reviewService.getReviewById(id);
        if (existingReview == null) {
            return ResponseEntity.notFound().build();
        }

        existingReview.setRating(reviewDetails.getRating());
        existingReview.setReviewText(reviewDetails.getReviewText());
        existingReview.setReviewDate(reviewDetails.getReviewDate());

        Review updatedReview = reviewService.saveReview(
                existingReview,
                existingReview.getUser().getId(),
                existingReview.getClothingItem().getId()
        );

        return ResponseEntity.ok(updatedReview);
    }

    // Delete a review by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
