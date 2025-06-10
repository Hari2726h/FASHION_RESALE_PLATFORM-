package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Review;
import com.examly.springapp.model.User;
import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.repository.ReviewRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.ClothingItemRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findAll().stream()
                .filter(r -> r.getUser().getId().equals(userId))
                .collect(Collectors.toList());
    }

    public Review saveReview(Review review, Long userId, Long clothingItemId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        ClothingItem item = clothingItemRepository.findById(clothingItemId)
            .orElseThrow(() -> new RuntimeException("Clothing item not found with id: " + clothingItemId));

        review.setUser(user);
        review.setClothingItem(item);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }
}
