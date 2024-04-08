package com.example.collectionTracker.controller;

import com.example.collectionTracker.entity.Listing;
import com.example.collectionTracker.entity.MediaItems;
import com.example.collectionTracker.service.FileStorageService;
import com.example.collectionTracker.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin("*") // Allow requests from all origins
public class ListingController {

    @Autowired
    private ListingService listingService;

    @Autowired
    private FileStorageService fileStorageService;

    @SuppressWarnings("null")
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Listing> createListing(
        @RequestParam("title") String title,
        @RequestParam("price") Double price,
        @RequestParam("description") String description,
        @RequestParam("media") MultipartFile[] mediaFiles) {

        Listing listing = new Listing();
        listing.setTitle(title);
        listing.setPrice(price);
        listing.setDescription(description);

        List<MediaItems> mediaItemsList = new ArrayList<>();

        // Handle and save media files, then add to listing
        for (MultipartFile file : mediaFiles) {
            try {
                String url = fileStorageService.store(file);
                MediaItems mediaItem = new MediaItems();
                mediaItem.setUrl(url);
                mediaItem.setType(file.getContentType() != null && file.getContentType().startsWith("image") ? "image" : "video");
                // Set aspect ratio accordingly, you may need additional logic here
                mediaItem.setAspectRatio(mediaItem.getType().equals("image") ? 16.0 / 9.0 : 4.0 / 3.0);
                mediaItem.setListing(listing);
                mediaItemsList.add(mediaItem);
            } catch (IOException e) {
                e.printStackTrace();
                // Handle storage exception
            }
        }

        listing.setMediaItems(mediaItemsList);

        Listing savedListing = listingService.saveListing(listing);
        return ResponseEntity.ok(savedListing);
    }
}
