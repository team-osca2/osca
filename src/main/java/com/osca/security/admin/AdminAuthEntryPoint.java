package com.osca.security.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:21
 */
@Component
public class AdminAuthEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest req, HttpServletResponse res, org.springframework.security.core.AuthenticationException e) throws IOException {
    // 인증 안 된 상태로 /admin/** 접근 시 로그인 페이지로
    res.sendRedirect("/admin/login");
  }
}