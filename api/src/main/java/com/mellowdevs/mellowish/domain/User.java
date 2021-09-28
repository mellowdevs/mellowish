package com.mellowdevs.mellowish.domain;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author mellow
 */
@Document(collection = "user")
public class User {
    private String _id;
    private String username;
    private String password;
    private String email;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
