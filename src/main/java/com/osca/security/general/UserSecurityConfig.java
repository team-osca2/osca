package com.osca.security.general;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-12 오전 12:22
 */
@Configuration
@RequiredArgsConstructor
public class UserSecurityConfig {

  private final PasswordEncoder passwordEncoder;

  @Bean
  @Order(2) // 어드민보다 뒤(폴백 체인)
  public SecurityFilterChain generalSecurity(HttpSecurity http) throws Exception {

    http
        .securityMatcher("/**")
        .authorizeHttpRequests(
            request -> request.anyRequest().permitAll()
        );

    return http.build();
  }

}
