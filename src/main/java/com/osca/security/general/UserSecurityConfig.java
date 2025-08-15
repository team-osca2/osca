package com.osca.security.general;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer.SessionFixationConfigurer;
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

  private final GeneralUserDetailsService generalUserDetailsService;
  private final PasswordEncoder passwordEncoder;

  @Bean
  @Order(1) // 어드민보다 뒤(폴백 체인)
  public SecurityFilterChain generalSecurity(HttpSecurity http) throws Exception {
    http
        // 나머지 모든 요청을 처리
        .securityMatcher("/**")

        .authorizeHttpRequests(auth -> auth
            // 공개 페이지(예: 메인, 스터디/카페 조회, 로그인/회원가입 등)
            .requestMatchers("/", "/home", "/study/**", "/cafe/**",
                "/login", "/logout", "/sign-up/**",
                "/api/public/**").permitAll()
            // API는 별도 정책에 맞게
            .requestMatchers("/api/**").authenticated()
            .anyRequest().authenticated()
        )

        // REST API용 CSRF 예외, 폼은 기본 활성
        .csrf(csrf -> csrf
            .ignoringRequestMatchers("/api/**")
        )

        // 일반 사용자 전용 로그인
        .formLogin(form -> form
            .loginPage("/login")                // GET
            .loginProcessingUrl("/login")       // POST
            .defaultSuccessUrl("/", true)
            .failureUrl("/login?error")
            .permitAll()
        )

        .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessUrl("/")
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
        )

        .sessionManagement(session -> session
            .sessionFixation(SessionFixationConfigurer::migrateSession)
            .maximumSessions(2)
            .maxSessionsPreventsLogin(false)
        )

        .authenticationProvider(generalAuthenticationProvider());

    return http.build();
  }

  @Bean
  public DaoAuthenticationProvider generalAuthenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider(generalUserDetailsService);
    provider.setPasswordEncoder(passwordEncoder);
    return provider;
  }
}
