package com.osca.security;

import static org.springframework.core.Ordered.HIGHEST_PRECEDENCE;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:15
 */
@Configuration
public class SecurityCommonConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  // 보안 필터 자체를 타지 않게 완전 무시(성능 목적)
  @Bean
  @Order(HIGHEST_PRECEDENCE)
  public SecurityFilterChain webSecurityCustomizer(HttpSecurity security) throws Exception {
    return security
        .securityMatcher("/favicon.ico", "/robots.txt", "/assets/**", "/css/**", "/js/**",
            "/images/**", "/webjars/**")
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
        .build();
  }
}
