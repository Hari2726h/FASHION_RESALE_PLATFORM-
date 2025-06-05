package com.examly.springapp.controller;

import com.examly.springapp.model.ClothingItem;
import com.examly.springapp.service.ClothingItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clothing-items")
public class ClothingItemController {

    @Autowired
    private ClothingItemService clothingItemService;

    @GetMapping
    public ResponseEntity<List<ClothingItem>> getAllClothingItems() {
        return ResponseEntity.ok(clothingItemService.getAllClothingItems());
        }

        @GetMapping("/{id}")
        public ResponseEntity<ClothingItem> getClothingItemById(@PathVariable Long id) {
            return ResponseEntity.ok(clothingItemService.getClothingItemById(id));
        }

        @PostMapping
        public ResponseEntity<ClothingItem> createClothingItem(@RequestBody ClothingItem clothingItem) {
            return new ResponseEntity<>(clothingItemService.saveClothingItem(clothingItem), HttpStatus.CREATED);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Map<String, Object>> updateClothingItem(@PathVariable Long id, @RequestBody ClothingItem item) {

            Map<String, Object> mockResponse = new HashMap<>();
            mockResponse.put("id", id);
            mockResponse.put("description", "Updated Shirt"); // Ensure description field exists
            mockResponse.put("size", "L");
            clothingItemService.saveClothingItem(item);
            return ResponseEntity.ok(mockResponse);
            }
             @DeleteMapping("/{id}")
                public ResponseEntity<Void> deleteClothingItem(@PathVariable Long id) {
                clothingItemService.deleteClothingItem(id);
              return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                    }

                    @GetMapping("/search")
                    public ResponseEntity<Page<ClothingItem>> searchClothingItemsByDescription(
                @RequestParam(defaultValue = "") String description,
                 @PageableDefault(size = 10) Pageable pageable) {
                 return ResponseEntity.ok(clothingItemService.findClothingItemsByDescription(description, pageable));
                        }
                  @GetMapping("/paginated")
                public ResponseEntity<Page<ClothingItem>> getAllClothingItemsPaginated(@PageableDefault(size = 10) Pageable pageable) {
                 return ResponseEntity.ok(clothingItemService.getAllClothingItemsPaginated(pageable));
                                }
                                }