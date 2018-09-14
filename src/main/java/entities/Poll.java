package entities;

import encapsulation.EducationLevel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;


@Entity
public class Poll {
    @Id
    @GeneratedValue
    private long id;

    private String firstName;

    private String lastName;

    private String sector;

    private EducationLevel educationLevel;

    private Date date;

    private double latitude;

    private double longitude;

    public Poll() {
    }

    public Poll(String firstName, String lastName, String sector, EducationLevel educationLevel, Date date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.sector = sector;
        this.educationLevel = educationLevel;
        this.date = date;
    }

    public Poll(String firstName, String lastName, String sector, EducationLevel educationLevel, Date date, double latitude, double longitude) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.sector = sector;
        this.educationLevel = educationLevel;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getEducationLvlFormated() {
        String res = new String();
        switch (this.educationLevel) {
            case PRIMARY:
                res = "Primaria";
                break;
            case SECONDARY:
                res = "Secundaria";
                break;
            case UNIVERSITY:
                res = "Universitaria";
                break;
            case MASTER:
                res = "Magistral";
                break;
            case DOCTORATE:
                res = "Doctoral";
                break;
        }

        return res;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
