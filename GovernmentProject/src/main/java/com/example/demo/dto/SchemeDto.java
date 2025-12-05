package com.example.demo.dto;

public class SchemeDto {

	 private Long id;

	    private String schemeName;
	    private String description;
	    private String eligibility;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getSchemeName() {
			return schemeName;
		}
		public void setSchemeName(String schemeName) {
			this.schemeName = schemeName;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getEligibility() {
			return eligibility;
		}
		public void setEligibility(String eligibility) {
			this.eligibility = eligibility;
		}
	    
	    
}
