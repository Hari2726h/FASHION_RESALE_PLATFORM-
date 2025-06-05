package com.examly.springapp.service;

import com.examly.springapp.model.Transaction;
import com.examly.springapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
        }

        public List<Transaction> getAllTransactions() {
            return transactionRepository.findAll();
        }

        public Transaction getTransactionById(Long id) {
            return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
        }

        public void deleteTransaction(Long id) {
            transactionRepository.deleteById(id);
            }
            }