package com.examly.springapp.repository;

import com.examly.springapp.model.ClothingItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {
    @Query("SELECT c FROM ClothingItem c WHERE LOWER(c.description) LIKE LOWER(CONCAT('%', :description, '%'))")
    Page<ClothingItem> findByDescriptionContainingIgnoreCase(@Param("description") String description, Pageable pageable);
}
