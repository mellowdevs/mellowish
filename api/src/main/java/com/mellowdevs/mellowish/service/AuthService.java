package com.mellowdevs.mellowish.service;

import com.mellowdevs.mellowish.dto.LoginRequestDto;
import com.mellowdevs.mellowish.dto.RegisterRequestDto;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;


/**
 * @author mellow
 */
public interface AuthService {
    void signup(RegisterRequestDto registerRequestDto);

    String login(LoginRequestDto loginRequestDto);

    Optional<User> getCurrentUser();
}
