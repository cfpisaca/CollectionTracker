package com.postgresql.collectionTracker.controller;

import com.postgresql.collectionTracker.entity.Listing;
import com.postgresql.collectionTracker.repository.ListingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ListingController {

    @Autowired
    ListingRepository repo;

    @PostMapping("/addListing")
    public Listing addListing(@RequestBody Listing listing) {
        return repo.save(listing);
    }
}
