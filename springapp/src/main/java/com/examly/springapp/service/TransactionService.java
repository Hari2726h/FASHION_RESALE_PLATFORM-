package com.examly.springapp.service;

import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.model.Transaction;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ClothingItemRepository;
import com.examly.springapp.repository.TransactionRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothingItemRepository clothingItemRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction createTransaction(Long userId, Long clothingItemId, Double amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        ClothingItem item = clothingItemRepository.findById(clothingItemId)
                .orElseThrow(() -> new RuntimeException("Clothing item not found with id: " + clothingItemId));

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setClothingItem(item);
        transaction.setTransactionAmount(amount);
        transaction.setTransactionDate(new Date());
        transaction.setConfirmed(false); // default false

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return transactionRepository.findByUser(user);
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public Transaction confirmTransaction(Long id) {
        Transaction transaction = getTransactionById(id);
        transaction.setConfirmed(true);
        return transactionRepository.save(transaction);
    }
}
