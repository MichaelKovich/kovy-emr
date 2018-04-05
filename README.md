## Iyashi EMR | Electronic Medical Record Application

### Technologies
Node, Express, Express Session, Massive, PostgreSQL, Passport, Auth0, React, React Router, Redux, Redux Promise Middleware, Axios, Twilio, Stripe

### Provider and Patient Front-Ends
Providers are able to view their dashboard, check their messages, send messages to patients with whom they've had, or will have, visits and their colleagues, add medications to a patient's record, update a patient's medication record, add a visit with a patient, and update a visit.

Patients are able to view their dashboard, their medications (name, dosage, and whether it's a prescription or OTC), and their visits (date, type of visit, and the provider). Patients are also able to pay outstanding bills from within the application.

### Security and Authentication
Authentication is handled via Auth0 and users are added to a PostgreSQL database. Patient routes are protected by session checker middleware and provider routes are protected by both session checker middleware and 'provider status' checker middleware. Data handling and retrieval endpoints are also protected in this way so as to restrict such functionality (and data access) to appropriately permissioned parties.

### Twilio / Messages
Users have the ability to indicate whether they'd like to receive notifications regarding new messages. If they've expressed interest in this, they'll receive a text message on their mobile device whenever they're sent a new message. This process is carried out with Twilio. Messages also display the profile picture of the sender, allowing patients and providers to put a face to the name.

### Stripe / Billing
Patients have the ability to pay outstanding bills from within the application. This process is handled by Stripe and the react-stripe-checkout package. The user's credit card information is not stored or processed in the application. Instead, it's tokenized via Stripe.js and the token is shipped to Stripe via Express. This enhances the security of the process and reduces compliance burdens and overall liability. When selecting a bill to pay, the user can see the amount and a brief description of the nature of the charge. When the transaction is complete, the bill is marked as paid and no longer visible on the billing page.

### Reflection
Iyashi EMR is my first substantive project and proved to be a powerful tool for refining my skills, learning new technologies, and reflecting on my overall project-building methodology. This project highlighted the dire importance of a thorough planning process. Before I started coding, I drew up a minimum viable product on paper, broke the MVP down into bite-sized goals, and translated those into Trello cards. Even still, I realized that things can get messy pretty quickly! My biggest takeaway? Keep everything organized and write well-commented code from the start - don't table it for later.