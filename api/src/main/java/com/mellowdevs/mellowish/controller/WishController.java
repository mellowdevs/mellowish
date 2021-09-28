package com.mellowdevs.mellowish.controller;

import com.mellowdevs.mellowish.dto.WishDto;
import com.mellowdevs.mellowish.service.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author mellow
 */
@RestController
@RequestMapping("/category/{catId}/wish")
public class WishController {
    @Autowired
    private WishService wishService;
    @GetMapping
    public ResponseEntity<List<WishDto>> getAllWishes(@PathVariable String catId){
        return new ResponseEntity<>(wishService.getAllWishes(catId), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<WishDto> getWish(@PathVariable String id, @PathVariable String catId){
        return new ResponseEntity<>(wishService.getWish(id, catId), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<WishDto> createWish(@PathVariable String catId, @RequestBody WishDto wishDto) {
        return new ResponseEntity<>(wishService.createWish(catId,wishDto), HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<WishDto> updateWish(@PathVariable String catId, @RequestBody WishDto wishDto) {
        return new ResponseEntity<>(wishService.updateWish(catId,wishDto), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<WishDto> deleteWish(@PathVariable String catId, @PathVariable String id){
        return new ResponseEntity<>(wishService.deleteWish(id, catId), HttpStatus.OK);
    }
    @DeleteMapping("/all")
    public ResponseEntity<WishDto> deleteAllWishesFromCategory(@PathVariable String catId){
        wishService.deleteAll(catId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
