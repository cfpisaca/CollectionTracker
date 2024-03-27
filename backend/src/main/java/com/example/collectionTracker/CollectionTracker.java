package com.example.collectionTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.collectionTracker.entity") // Specify the package where entity classes are located
public class CollectionTracker {

	public static void main(String[] args) {
		SpringApplication.run(CollectionTracker.class, args);
	}

}
