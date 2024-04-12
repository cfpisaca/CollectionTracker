package com.postgresql.collectionTracker.repository;

import com.postgresql.collectionTracker.entity.Collector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CollectorRepository extends JpaRepository<Collector, Long> {
}
