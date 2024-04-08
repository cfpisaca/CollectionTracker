package com.example.collectionTracker.repository;

import com.example.collectionTracker.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingRepository extends JpaRepository<Listing, Long> {
}
