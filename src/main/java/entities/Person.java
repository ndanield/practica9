package entities;

import encapsulation.EducationLevel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Person {
    @Id
    @GeneratedValue
    private long id;

    private String firstName;

    private String lastName;


    private String sector;

    private EducationLevel educationLevel;

    public Person() {
    }

    /*public Person(String name, String sector, EducationLevel educationLevel) {
        this.name = name;
        this.sector = sector;
        this.educationLevel = educationLevel;
    }*/

    public Person(String firstName, String lastName, String sector, EducationLevel educationLevel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.sector = sector;
        this.educationLevel = educationLevel;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public EducationLevel getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(EducationLevel educationLevel) {
        this.educationLevel = educationLevel;
    }
}
