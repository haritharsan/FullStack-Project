package com.example.demo.dto;

public class ApplicationDto {

	  private Long id;

	 
	    private String certificateType;
	    private String tamilCertificateType;
	    private String fullName;
	    private String fatherName;
	    private String motherName;
	    private String dob;
	    private String gender;
	    private String address;
	    private String district;
	    private String taluk;
	    private String mobile;
	    private String email;

	    private String aadhaar;        // ⭐ NEW – Aadhaar filename
	    private String status;         // Pending | Approved | Rejected
	    private String appliedDate;
	    private String certificateUrl; // PDF link when approved

 

		public String getTamilCertificateType() {
			return tamilCertificateType;
		}
		public void setTamilCertificateType(String tamilCertificateType) {
			this.tamilCertificateType = tamilCertificateType;
		}
		public String getDistrict() {
			return district;
		}
		public void setDistrict(String district) {
			this.district = district;
		}
		public String getTaluk() {
			return taluk;
		}
		public void setTaluk(String taluk) {
			this.taluk = taluk;
		}
		public String getAadhaar() {
			return aadhaar;
		}
		public void setAadhaar(String aadhaar) {
			this.aadhaar = aadhaar;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}

		public String getCertificateType() {
			return certificateType;
		}
		public void setCertificateType(String certificateType) {
			this.certificateType = certificateType;
		}
		public String getFullName() {
			return fullName;
		}
		public void setFullName(String fullName) {
			this.fullName = fullName;
		}
		public String getFatherName() {
			return fatherName;
		}
		public void setFatherName(String fatherName) {
			this.fatherName = fatherName;
		}
		public String getMotherName() {
			return motherName;
		}
		public void setMotherName(String motherName) {
			this.motherName = motherName;
		}
		public String getDob() {
			return dob;
		}
		public void setDob(String dob) {
			this.dob = dob;
		}
		public String getGender() {
			return gender;
		}
		public void setGender(String gender) {
			this.gender = gender;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public String getMobile() {
			return mobile;
		}
		public void setMobile(String mobile) {
			this.mobile = mobile;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getAppliedDate() {
			return appliedDate;
		}
		public void setAppliedDate(String appliedDate) {
			this.appliedDate = appliedDate;
		}
		public String getCertificateUrl() {
			return certificateUrl;
		}
		public void setCertificateUrl(String certificateUrl) {
			this.certificateUrl = certificateUrl;
		}
	
	    
	    
}
