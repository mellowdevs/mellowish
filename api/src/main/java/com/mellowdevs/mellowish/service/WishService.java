package com.mellowdevs.mellowish.service;


import com.mellowdevs.mellowish.dto.WishDto;

import java.util.List;

/**
 * @author mellow
 */
public interface WishService {
    WishDto createWish(String categoryId, WishDto wishDto);

    List<WishDto> getAllWishes(String catId);

    WishDto getWish(String catId, String id);

    WishDto updateWish(String catId, WishDto wishDto);

    WishDto deleteWish(String id, String catId);

    void deleteAll(String catId);
}
