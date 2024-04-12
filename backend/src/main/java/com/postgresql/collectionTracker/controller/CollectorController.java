package com.postgresql.collectionTracker.controller;

import com.postgresql.collectionTracker.entity.Collector;
import com.postgresql.collectionTracker.repository.CollectorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class CollectorController {

    @Autowired
    CollectorRepository repo;

    @PostMapping("/addCollector")
    public Collector addCollector(@RequestBody Collector collector) {
        return repo.save(collector);
    }
}
