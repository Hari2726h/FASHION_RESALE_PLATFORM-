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

import com.examly.springapp.model.Review;
import com.examly.springapp.model.Transaction;
import com.examly.springapp.service.ReviewService;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReview(){
        return ResponseEntity.ok(reviewService.getAllReview());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id){
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.saveReview(review),HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
        public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
            Review review = reviewService.getReviewById(id);

            review.setRating(reviewDetails.getRating());
            review.setReviewDate(reviewDetails.getReviewDate());
            review.setReviewText(reviewDetails.getReviewText());

            return ResponseEntity.ok(reviewService.saveReview(review));
            }
    @DeleteMapping("/{id}")
            public ResponseEntity<Void> deleteReview (@PathVariable Long id) {
                reviewService.deleteReview(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
}
