package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ReviewRepository;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReview(){
        return reviewRepository.findAll();
    }
    public Review saveReview(Review review){
        return reviewRepository.save(review);
    }
    public void deleteReview(Long id){
      reviewRepository.deleteById(id);
    }
    public Review getReviewById(Long id){
        return reviewRepository.findById(id).
        orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

}
