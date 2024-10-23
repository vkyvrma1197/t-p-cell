# API Documentation

## Authentication

### User Login
- **POST** `/auth/login`
  - Description: Authenticate a user and receive a token for further requests.
  
### User Signup
- **POST** `/auth/signup`
  - Description: Register a new user in the system.

### Send OTP
- **POST** `/auth/sendotp`
  - Description: Send a One-Time Password (OTP) to the user's email for verification.

### Change Password
- **POST** `/auth/changepassword`
  - Description: Change the user's password. Requires authentication.

### Reset Password Token
- **POST** `/auth/reset-password-token`
  - Description: Generate a token for resetting the user's password.

---

## Job Applications

### Apply for Job
- **POST** `/applyJob`
  - Description: Submit an application for a job. Requires authentication and checks if the user is a student.

### Delete Job Application
- **DELETE** `/deleteApplyJobById`
  - Description: Remove a job application by ID. Requires authentication and checks if the user is a student.

### Get All Job Applications
- **GET** `/getAllApplyJobs`
  - Description: Retrieve all job applications made by the authenticated student.

---

## Current Academics

### Upload Resume
- **POST** `/currAcademics`
  - Description: Upload a resume. Requires authentication and checks if the user is a student.

### Update Resume
- **PUT** `/currAcademics/:id`
  - Description: Update the resume by ID. Requires authentication and checks if the user is a student.

### Add Current Academics
- **POST** `/currAcademics/add`
  - Description: Add current academic details. Requires authentication and checks if the user is a student.

### Update Current Academics
- **PUT** `/currAcademics/:id`
  - Description: Update current academic details by ID. Requires authentication and checks if the user is a student.

### Delete Current Academics
- **DELETE** `/currAcademics/:id`
  - Description: Remove current academic details by ID. Requires authentication and checks if the user is a student.

### Get All Current Academics
- **GET** `/currAcademics`
  - Description: Retrieve all current academic details for the authenticated student.

---

## User Profile Management

### Delete User Profile
- **DELETE** `/profile/deleteProfile`
  - Description: Delete the user's account. Requires authentication.

### Update User Profile
- **PUT** `/profile/updateProfile`
  - Description: Update user profile information. Requires authentication.

### Get User Details
- **GET** `/profile/getUserDetails`
  - Description: Retrieve details of the authenticated user.

### Update Display Picture
- **PUT** `/profile/updateDisplayPicture`
  - Description: Update the user's display picture. Requires authentication.

---

## Job Listings

### Get All Job Listings
- **GET** `/jobPostings/getAllJoblistings`
  - Description: Retrieve all job listings.

### Get Job Listing by ID
- **GET** `/jobPostings/getJobListingById/:id`
  - Description: Retrieve a specific job listing by ID.

### Post Job Listing
- **POST** `/jobPostings/postJoblistings`
  - Description: Create a new job listing. Requires authentication and checks if the user is an admin or coordinator.

### Update Job Listing
- **PUT** `/jobPostings/updateJobListingById/:id`
  - Description: Update an existing job listing by ID.

### Delete Job Listing
- **DELETE** `/jobPostings/deleteJobListingById/:id`
  - Description: Delete a job listing by ID.

---

## Gaps Management

### Add Gap
- **POST** `/gap/add`
  - Description: Add a gap entry. Requires authentication and checks if the user is a student.

### Get Gap by ID
- **GET** `/gap/:id`
  - Description: Retrieve a gap entry by ID. Requires authentication and checks if the user is a student.

### Update Gap
- **PUT** `/gap/:id`
  - Description: Update a gap entry by ID. Requires authentication and checks if the user is a student.

### Delete Gap
- **DELETE** `/gap/:id`
  - Description: Delete a gap entry by ID. Requires authentication and checks if the user is a student.

### Get All Gaps
- **GET** `/gap`
  - Description: Retrieve all gaps for the authenticated student.

