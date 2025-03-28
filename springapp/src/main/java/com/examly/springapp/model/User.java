package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ClothingItem> clothingItems = new HashSet<>();

    public User() {
        }

        public User(Long id, String name, String email, Set<ClothingItem> clothingItems) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.clothingItems = clothingItems;
        }

        public Long getId() {
            return id;
            }

            public void setId(Long id) {
                this.id = id;
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
                }

                public String getEmail() {
                return email;
                }

                public void setEmail(String email) {
                    this.email = email;
                    }

                    public String getPassword() {
                        return password;
                        }

                        public void setPassword(String password) {
                            this.password = password;
                        }

                        public Set<ClothingItem> getClothingItems() {
                            return clothingItems;
                        }

                        public void setClothingItems(Set<ClothingItem> clothingItems) {
                            this.clothingItems = clothingItems;
                        }
                    }