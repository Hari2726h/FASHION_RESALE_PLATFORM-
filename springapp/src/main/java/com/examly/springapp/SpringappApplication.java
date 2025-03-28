package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.io.File;

@SpringBootApplication
@EnableAspectJAutoProxy
public class SpringappApplication {

    public static void main(String[] args) {

        File logDir = new File("logs");
        if (!logDir.exists()) {
            logDir.mkdirs();
            }


            File logFile = new File("logs/application.log");
            if (!logFile.exists()) {
                try {
                logFile.createNewFile();
                } catch (Exception e) {
                    e.printStackTrace();
                    }
                    }

                    SpringApplication.run(SpringappApplication.class, args);
                }
                }