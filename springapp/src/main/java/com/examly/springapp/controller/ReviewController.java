package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @PostMapping("/user/{userId}/item/{clothingItemId}")
    public ResponseEntity<Review> createReview(
        @PathVariable Long userId,
        @PathVariable Long clothingItemId,
        @RequestBody Review review
    ) {
        return new ResponseEntity<>(reviewService.saveReview(review, userId, clothingItemId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        Review existingReview = reviewService.getReviewById(id);
        existingReview.setRating(reviewDetails.getRating());
        existingReview.setReviewText(reviewDetails.getReviewText());
        existingReview.setReviewDate(reviewDetails.getReviewDate());

        return ResponseEntity.ok(reviewService.saveReview(existingReview, 
            existingReview.getUser().getId(), 
            existingReview.getClothingItem().getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
