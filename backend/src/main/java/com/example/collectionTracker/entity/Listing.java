package com.example.collectionTracker.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import java.util.List;

@Entity
public class Listing {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private Double price;
    private String description;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaItems> mediaItems;

    // Constructors, Getters, and Setters
    
    // Setter for title
    public void setTitle(String title) {
        this.title = title;
    }

    // Setter for price
    public void setPrice(Double price) {
        this.price = price;
    }

    // Setter for description
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter and setter for mediaItems
    // Ensure this setter is defined as well
    public void setMediaItems(List<MediaItems> mediaItems) {
        this.mediaItems = mediaItems;
    }

    // Getter for mediaItems
    public List<MediaItems> getMediaItems() {
        return mediaItems;
    }
}
