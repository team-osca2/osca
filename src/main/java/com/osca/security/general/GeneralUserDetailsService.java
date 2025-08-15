package com.osca.security.general;

import com.osca.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:22
 */

@Service
@RequiredArgsConstructor
public class GeneralUserDetailsService implements UserDetailsService {
  private final MemberMapper memberMapper;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return memberMapper.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("member not found"));
  }
}