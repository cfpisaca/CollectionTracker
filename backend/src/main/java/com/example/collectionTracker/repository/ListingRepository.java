package com.example.collectionTracker.repository;

import com.example.collectionTracker.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ListingRepository extends JpaRepository<Listing, Long> {
}
