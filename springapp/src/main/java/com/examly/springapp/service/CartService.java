package com.examly.springapp.service;

import com.examly.springapp.model.Cart;
import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.CartRepository;
import com.examly.springapp.repository.ClothingItemRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    public Cart getCartByUserId(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return null;
        }
        User user = userOpt.get();
        return cartRepository.findByUser(user).orElse(new Cart(null, user, Set.of()));
    }

    public Cart addItemToCart(Long userId, Long clothingItemId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return null;

        Optional<ClothingItem> itemOpt = clothingItemRepository.findById(clothingItemId);
        if (itemOpt.isEmpty()) return null;

        User user = userOpt.get();
        ClothingItem item = itemOpt.get();

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            newCart.setClothingItems(new HashSet<>());
            return newCart;
        });

        cart.getClothingItems().add(item);
        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(Long userId, Long clothingItemId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return null;

        Optional<ClothingItem> itemOpt = clothingItemRepository.findById(clothingItemId);
        if (itemOpt.isEmpty()) return null;

        User user = userOpt.get();
        ClothingItem item = itemOpt.get();

        Optional<Cart> cartOpt = cartRepository.findByUser(user);
        if (cartOpt.isEmpty()) return null;

        Cart cart = cartOpt.get();
        cart.getClothingItems().remove(item);

        return cartRepository.save(cart);
    }

    public boolean clearCart(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return false;

        User user = userOpt.get();
        Optional<Cart> cartOpt = cartRepository.findByUser(user);
        if (cartOpt.isEmpty()) return false;

        Cart cart = cartOpt.get();
        cart.getClothingItems().clear();
        cartRepository.save(cart);
        return true;
    }
    public Cart getOrCreateCart(Long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    if (userOpt.isEmpty()) {
        return null;  // or throw exception if preferred
    }
    User user = userOpt.get();

    return cartRepository.findByUser(user).orElseGet(() -> {
        Cart newCart = new Cart();
        newCart.setUser(user);
        newCart.setClothingItems(new HashSet<>());
        return cartRepository.save(newCart);
    });
}

}
