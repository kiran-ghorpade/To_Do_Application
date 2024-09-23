package com.practical.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

	@GetMapping("/app")
	public String getHomePage(Model model) {
		return "index";
	}

}
