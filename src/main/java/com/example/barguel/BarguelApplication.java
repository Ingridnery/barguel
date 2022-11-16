package com.example.barguel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@Controller
public class BarguelApplication {

    public static void main(String[] args) {
        SpringApplication.run(BarguelApplication.class, args);
    }

    @GetMapping("/")
    public String index(){
        return "Ola mundo";
    }

}
