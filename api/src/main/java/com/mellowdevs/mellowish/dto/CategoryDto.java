package com.mellowdevs.mellowish.dto;


import java.util.ArrayList;
import java.util.List;

/**
 * @author mellow
 */
public class CategoryDto {
    private String _id;
    private String username;
    private String name;
    private List<WishDto> wishDtos = new ArrayList<>();

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<WishDto> getWishDtos() {
        return wishDtos;
    }

    public void setWishDtos(List<WishDto> wishDtos) {
        this.wishDtos = wishDtos;
    }
}
