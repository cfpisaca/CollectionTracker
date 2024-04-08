package com.example.collectionTracker.service;

import com.example.collectionTracker.entity.Listing;
import com.example.collectionTracker.repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListingService {
    @Autowired
    private ListingRepository listingRepository;

    public Listing saveListing(Listing listing) {
        return listingRepository.save(listing);
    }
}
