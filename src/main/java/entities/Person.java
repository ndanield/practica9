package entities;

import encapsulation.EducationLevel;

import javax.persistence.Entity;


@Entity
public class Person {
    private long id;
    private String name;
    private String sector;
    private EducationLevel educationLevel;
}
