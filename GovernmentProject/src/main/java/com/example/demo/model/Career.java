package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "careers")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private String experience;

    @Column(name = "closing_date")
    private String closingDate;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String responsibilities; // newline separated

    @Column(columnDefinition = "TEXT")
    private String skills; // newline or comma separated

    // --- Constructors ---
    public Career() {}

    public Career(String title, String location, String experience, String closingDate,
                  String summary, String responsibilities, String skills) {
        this.title = title;
        this.location = location;
        this.experience = experience;
        this.closingDate = closingDate;
        this.summary = summary;
        this.responsibilities = responsibilities;
        this.skills = skills;
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getClosingDate() { return closingDate; }
    public void setClosingDate(String closingDate) { this.closingDate = closingDate; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}
