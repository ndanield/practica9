package entity;

import javax.persistence.Entity;

@Entity
public class Person {
    private long id;
    private String name;
    private String sector;
    private String escolarLevel;
}
