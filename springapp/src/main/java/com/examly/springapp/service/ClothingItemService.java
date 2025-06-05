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
    private ClothingItemRepository clothingItemRepository;

    public ClothingItem saveClothingItem(ClothingItem clothingItem) {
        return clothingItemRepository.save(clothingItem);
    }

    public List<ClothingItem> getAllClothingItems() {
        return clothingItemRepository.findAll();
        }

        public ClothingItem getClothingItemById(Long id) {
            return clothingItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Clothing item not found with id: " + id));
            }

        

                public void deleteClothingItem(Long id) {
                    clothingItemRepository.deleteById(id);
                }

                public Page<ClothingItem> findClothingItemsByDescription(String description, Pageable pageable) {
                    return clothingItemRepository.findByDescriptionContainingIgnoreCase(description, pageable);
                }
                    public Page<ClothingItem> getAllClothingItemsPaginated(Pageable pageable) {
                        return clothingItemRepository.findAll(pageable);
                    }
                    }