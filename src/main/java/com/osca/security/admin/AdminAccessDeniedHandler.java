package com.osca.security.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:21
 */

@Component
public class AdminAccessDeniedHandler implements AccessDeniedHandler {
  @Override
  public void handle(HttpServletRequest req, HttpServletResponse res, AccessDeniedException ex) throws IOException {
    // 인증은 됐지만 권한 거부
    res.sendRedirect("/admin/login?denied");
  }
}