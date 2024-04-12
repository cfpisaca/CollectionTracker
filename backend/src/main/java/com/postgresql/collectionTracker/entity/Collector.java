package com.postgresql.collectionTracker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "collector")
public class Collector {
    @Id
    private long id;
    private String firstname;
    private String lastname;
    private String username;
    private String emailOrMobile;
    private String password;
    private String birthdate;
    private String gender;

}
