package com.examly.springapp.service;

import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.repository.ClothingItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClothingItemService {

    @Autowired
    private ClothingItemRepository repository;

    public List<ClothingItem> getAllClothingItems() {
        return repository.findAll();
    }

    public Page<ClothingItem> getAllClothingItemsPaginated(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public ClothingItem getClothingItemById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public ClothingItem saveClothingItem(ClothingItem item) {
        return repository.save(item);
    }

    public void deleteClothingItem(Long id) {
        repository.deleteById(id);
    }

    public Page<ClothingItem> findClothingItemsByDescription(String description, Pageable pageable) {
        return repository.findByDescriptionContainingIgnoreCase(description, pageable);
    }
}
