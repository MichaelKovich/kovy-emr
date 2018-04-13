## Iyashi EMR | Electronic Medical Record Application

### Technologies and Packages

Node, Express, Express Session, Massive, PostgreSQL, Passport, Auth0, React, React Router, Redux, Redux Promise Middleware, Axios, Request Promise, Twilio, Stripe, Amazon SES, Nodemailer, Amazon S3, React S3 Uploader, Moment.js, 23andMe API, Digital Ocean, Ubuntu, Nginx, Heroku PostgreSQL

### Provider and Patient Front-Ends

Providers are able to view their dashboard, check their messages, send messages to patients with whom they've had, or will have, visits and their colleagues, update their profile, add medications to a patient's record, update a patient's medication record, add a visit with a patient, update a visit. They can also opt-in to receive SMS notifications of new messages and cancelled visits.

Patients are able to view their dashboard, their medications (name, dosage, and whether it's a prescription or OTC), and their visits (date, type of visit, and the provider). Patients can cancel visits (so long as they're at least 24 hours in the future), pay their outstanding medical bills, view their billing history, update their profile, and opt-in to receive SMS notifications of new messages.

### Security and Authentication

Authentication is handled via Auth0 and users are added to a PostgreSQL database. Patient routes are protected by session checker middleware and provider routes are protected by both session checker middleware and 'provider status' checker middleware. Data handling and retrieval endpoints are also protected in this way so as to restrict such functionality (and data access) to appropriately permissioned parties.

The application also has a valid SSL certificate and runs over HTTPS.

### Messages (Twilio, Moment.js)

Users have the ability to indicate whether they'd like to receive notifications regarding new messages. If they've expressed interest in this (by setting "Receive Notifications" to "Yes" on their profile), they'll receive a text message on their mobile device whenever they're sent a new message. This process is carried out with Twilio. Messages also display the profile picture of the sender, allowing patients and providers to put a face to the name, and the date and time the message was sent.

### Billing (Stripe)

Patients have the ability to pay outstanding bills from within the application. This process is handled by Stripe and the react-stripe-checkout package. The user's credit card information is not stored or processed in the application. Instead, it's tokenized via Stripe.js and the token is shipped to Stripe via Express. This enhances the security of the process and reduces compliance burdens and overall liability. When selecting a bill to pay, the user can see the amount and a brief description of the nature of the charge. When the transaction is complete, the bill is marked as paid and no longer visible on the billing page.

### Nodemailer and Amazon SES

When a user accesses the platform for the first time, they receive a welcome email sent using Nodemailer with an Amazon SES transporter. To help minimize the risk of the email landing in the user's spam folder, I configured my domain's DomainKeys Identified Mail (DKIM) authentication protocol. Amazon approved the application to send 50,000 messages per day and to unverified email addresses.

### Genomics (23andMe API)

23andMe is a biotechnology company that uses genotyping to analyze an individual's DNA. Within the IyashiEMR application, users are able to connect to their 23andMe accounts and view personalized Genetic Phenotype Range Interaction reports. This is made possible through the use of Request Promise, 23andMe's API, and OAuth.

### Amazon S3

Patients and physicians have the ability to add a photo of themselves to their profile. Images are uploaded to, and served from, an Amazon S3 bucket.

### Hosting (Digital Ocean)

The application is hosted with Digital Ocean. The droplet runs Ubuntu and Nginx and is equipped with an automatically-renewing SSL certificate through [Let's Encrypt](https://letsencrypt.org/about/). The Qualys SSL Server Test gives IyashiEMR [an 'A' rating](https://www.ssllabs.com/ssltest/analyze.html?d=iyashiemr.com).

### Reflection

Iyashi EMR is my first substantive project and proved to be a powerful tool for refining my skills, learning new technologies, and reflecting on my overall project-building methodology. This project highlighted the dire importance of a thorough planning process. Before I started coding, I drew up a minimum viable product on paper, broke the MVP down into bite-sized goals, and translated those into Trello cards. Even still, I realized that things can get messy pretty quickly! My biggest takeaway? Keep everything organized and write well-commented code from the start - don't table it for later.
