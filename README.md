 Fashion Product Selling Website – E-commerce Platform
The third major project is a Fashion Product Selling Website, an e-commerce platform I evolved from a backend-only academic project into a complete full-stack solution. Originally developed in my fourth semester with just three controllers (User, Transaction, Data Plotting), I expanded it into a robust system supporting both admin and user functionalities.

I restructured the backend to include 7–8 controllers, supporting user management, orders, and inventory. I implemented admin login using a fixed email/password and provided flexible authentication for general users. Learning from previous deployment issues, I initially skipped advanced security to avoid unnecessary delays.

The frontend was developed using React and styled using Bootstrap to minimise complexity. Designing separate dashboards and views for admin and users was particularly challenging, but I resolved this through modular development. The full application was completed in 10 days.

Deployment posed the biggest challenge. I learned how to Dockerize the Spring Boot backend, host it on Render, and deploy the frontend on Netlify. However, I ran into a major issue: MySQL wasn’t supported on free-tier cloud services. To overcome this, I migrated the database to PostgreSQL, used Neon.tech for hosting, and reconfigured my backend.

I followed best practices for Docker: creating a Dockerfile, building the app with Maven, pushing to Docker Hub, and configuring environment variables. Despite successful deployment, I discovered Render’s 15-minute inactivity limit, which deactivates services. To fix this, I integrated FastCron, which pings the backend periodically to keep it alive.

JWT authentication in my Personal Finance Manager initially blocked these pings due to strict CORS policies. I resolved it by modifying the Spring Security config to permit unauthorised access to certain endpoints. Over 5 intense days, I redeployed the applications more than 10 times, fine-tuning Docker, environment configs, and frontend integration.

Ultimately, both applications were successfully hosted across Render, Netlify, and Neon, accessible on mobile and desktop, and maintained using entirely free-tier tools. This project not only strengthened my deployment skills but also highlighted the importance of adaptability and patience in real-world development.
