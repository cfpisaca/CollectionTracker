// Inside ListingController
package com.postgresql.collectionTracker.controller;

import com.postgresql.collectionTracker.entity.Listing;
import com.postgresql.collectionTracker.repository.ListingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ListingController {

    @Autowired
    ListingRepository repo;

    private long lastId = 0; 

    @PostMapping("/addListing")
    public Listing addListing(@RequestBody Listing listing) {
        listing.setId(++lastId);
        return repo.save(listing);
    }
}
