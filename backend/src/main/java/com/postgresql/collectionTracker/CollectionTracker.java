package com.postgresql.collectionTracker;

import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.postgresql.collectionTracker.service.StorageService;

@SpringBootApplication
@RestController
@RequestMapping("/media")
public class CollectionTracker {

    @Autowired
    private StorageService service;

    @PostMapping
    public ResponseEntity<?> uploadMedia(@RequestParam("id") Long id, @RequestParam("media") MultipartFile file) throws IOException {
        String uploadImage = service.uploadMedia(id, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadMedia(@PathVariable String fileName){
        byte[] mediaData = service.downloadMedia(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.IMAGE_PNG)
                .body(mediaData);
    }

    public static void main(String[] args) {
        SpringApplication.run(CollectionTracker.class, args);
    }
}
