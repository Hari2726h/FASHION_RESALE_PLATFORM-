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

import java.util.List;

@RestController
@RequestMapping("/api/clothing-items")
public class ClothingItemController {

    @Autowired
    private ClothingItemService clothingItemService;
@GetMapping
public ResponseEntity<List<ClothingItem>> getAllClothingItems() {
    List<ClothingItem> items = clothingItemService.getAllClothingItems();
    System.out.println("Fetched " + items.size() + " clothing items.");
    return ResponseEntity.ok(items);
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
    public ResponseEntity<ClothingItem> updateClothingItem(@PathVariable Long id, @RequestBody ClothingItem updatedItem) {
        ClothingItem existingItem = clothingItemService.getClothingItemById(id);
        if (existingItem == null) {
            return ResponseEntity.notFound().build();
        }

        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setSize(updatedItem.getSize());
        existingItem.setUser(updatedItem.getUser());

        ClothingItem savedItem = clothingItemService.saveClothingItem(existingItem);
        return ResponseEntity.ok(savedItem);
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
    public ResponseEntity<Page<ClothingItem>> getAllClothingItemsPaginated(
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(clothingItemService.getAllClothingItemsPaginated(pageable));
    }
}
