package com.examly.springapp.controller;

import com.examly.springapp.model.Transaction;
import com.examly.springapp.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Admin: get all transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // User: get all transactions for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getTransactionsByUser(userId));
    }

    // Get by transaction ID
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @PostMapping("/user/{userId}/item/{itemId}")
public ResponseEntity<Transaction> createTransaction(
        @PathVariable Long userId,
        @PathVariable Long itemId,
        @RequestBody Map<String, Double> body) {
    
    Double amount = body.get("amount");
    Transaction transaction = transactionService.createTransaction(userId, itemId, amount);
    return new ResponseEntity<>(transaction, HttpStatus.CREATED);
}


    // Admin: confirm transaction
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Transaction> confirmTransaction(@PathVariable Long id) {
        Transaction confirmed = transactionService.confirmTransaction(id);
        return ResponseEntity.ok(confirmed);
    }

    // Delete transaction (optional)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
