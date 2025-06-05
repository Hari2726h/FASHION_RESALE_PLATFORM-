package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.*;

// import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transactions")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long clothingItemId;

    private Date transactionDate;

    private Double transactionAmount;

    public Transaction() {
        }

        public Transaction(Long id, Long userId, Long clothingItemId, Date transactionDate, Double transactionAmount) {
            this.id = id;
            this.userId = userId;
            this.clothingItemId = clothingItemId;
            this.transactionDate = transactionDate;
            this.transactionAmount = transactionAmount;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Long getClothingItemId() {
            return clothingItemId;
            }

            public void setClothingItemId(Long clothingItemId) {
                this.clothingItemId = clothingItemId;
            }

            public Date getTransactionDate() {
                return transactionDate;
                }

                public void setTransactionDate(Date transactionDate) {
                    this.transactionDate = transactionDate;
                }

                public Double getTransactionAmount() {
                    return transactionAmount;
                }

                public void setTransactionAmount(Double transactionAmount) {
                    this.transactionAmount = transactionAmount;
                }
            }
    