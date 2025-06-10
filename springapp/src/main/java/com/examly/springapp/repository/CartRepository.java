package com.examly.springapp.repository;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
