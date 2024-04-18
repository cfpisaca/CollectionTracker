package com.postgresql.collectionTracker.repository;

import com.postgresql.collectionTracker.entity.Collector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CollectorRepository extends JpaRepository<Collector, Long> {
    @Query("SELECT c FROM Collector c WHERE c.email = :email AND c.password = :password")
    Collector findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}

