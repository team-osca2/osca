package com.osca.common;

import com.osca.common.adapter.ViewAdapter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexView implements ViewAdapter {

  @GetMapping(value = {"", "/"})
  public String index() {
    return "index";
  }

}
