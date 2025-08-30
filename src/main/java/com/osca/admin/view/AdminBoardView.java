package com.osca.admin.view;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class AdminBoardView implements AdminViewAdapter {

  @GetMapping("/board")
  public String board() {
    return "admin/board/all";
  }

  @GetMapping("/faq")
  public String faq() {
    return "admin/faq/list";
  }

  @GetMapping("/member")
  public String member() {
    return "admin/member/list";
  }

  @GetMapping("/reply")
  public String reply() {
    return "admin/reply/list";
  }

}
