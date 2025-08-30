package com.osca.security.admin;

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
 * 관리자 Security Config
 *
 * @author :Uheejoon
 * @date :2025-08-12 오전 12:22
 */
@Configuration
@RequiredArgsConstructor
public class AdminSecurityConfig {

  private final AdminAccessDeniedHandler adminAccessDeniedHandler;
  private final AdminAuthEntryPoint adminAuthEntryPoint;

  @Bean
  @Order(1) // 가장 먼저 매칭(어드민이 우선)
  public SecurityFilterChain adminSecurity(HttpSecurity http) throws Exception {
    http
        // 이 체인은 /admin/**, /admin/login, /admin/logout 만 처리
        .securityMatcher("/admin/**", "/admin/login", "/admin/logout")

        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/admin/login", "/admin/logout", "/admin/**")
            .permitAll()
//            .anyRequest().hasRole("ADMIN")
        )

        // CSRF: 어드민 HTML 폼은 기본 활성화. 필요 시 /admin/api/** 만 예외 처리
        .csrf(csrf -> csrf
            .ignoringRequestMatchers("/api/admin//**")
        )

        .formLogin(form -> form
            .loginPage("/admin/login")               // GET 로그인 페이지
            .loginProcessingUrl("/admin/login")      // POST 인증 처리
            .defaultSuccessUrl("/admin", true)
            .failureUrl("/admin/login?error")
            .permitAll()
        )

        .logout(logout -> logout
            .logoutUrl("/admin/logout")
            .logoutSuccessUrl("/admin/login?logout")
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
        )

        .sessionManagement(session -> session
            .sessionFixation(SessionFixationConfigurer::migrateSession)
            .maximumSessions(1)
            .maxSessionsPreventsLogin(false)
        )

        .exceptionHandling(ex -> ex
            .accessDeniedHandler(adminAccessDeniedHandler)
            .authenticationEntryPoint(adminAuthEntryPoint)
        );

    return http.build();
  }

}
