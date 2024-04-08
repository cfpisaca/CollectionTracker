package com.example.collectionTracker.entity;

import javax.persistence.*;

@Entity
public class MediaItems {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url; // Reference to the file location
    private String type; // "image" or "video"
    private double aspectRatio;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    private Listing listing;

    // Constructors, Getters, and Setters
    
    // Setter for url
    public void setUrl(String url) {
        this.url = url;
    }

    // Getter for url
    public String getUrl() {
        return url;
    }

    // Setter for type
    public void setType(String type) {
        this.type = type;
    }

    // Getter for type
    public String getType() {
        return type;
    }

    // Setter for aspectRatio
    public void setAspectRatio(double aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    // Getter for aspectRatio
    public double getAspectRatio() {
        return aspectRatio;
    }

    // Setter for listing
    public void setListing(Listing listing) {
        this.listing = listing;
    }

    // Getter for listing
    public Listing getListing() {
        return listing;
    }
}
