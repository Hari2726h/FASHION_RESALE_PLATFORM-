package com.examly.springapp.controller;

import com.examly.springapp.model.Transaction;
import com.examly.springapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        return new ResponseEntity<>(transactionService.saveTransaction(transaction), HttpStatus.CREATED);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transactionDetails) {
            Transaction transaction = transactionService.getTransactionById(id);

            transaction.setUserId(transactionDetails.getUserId());
            transaction.setClothingItemId(transactionDetails.getClothingItemId());
            transaction.setTransactionDate(transactionDetails.getTransactionDate());
            transaction.setTransactionAmount(transactionDetails.getTransactionAmount());

            return ResponseEntity.ok(transactionService.saveTransaction(transaction));
            }

            @DeleteMapping("/{id}")
            public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
                transactionService.deleteTransaction(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
                }