package com.osca.security.admin;

import com.osca.admin.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:21
 */

@Service
@RequiredArgsConstructor
public class AdminUserDetailsService implements UserDetailsService {

  private final AdminMapper adminMapper;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return adminMapper.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("admin not found"));
  }
}