Job Listing Application:-
A full-stack job listing platform with filtering capabilities, built with React, Node.js, Express, MongoDB, and Tailwind CSS.

Features:-
- View all job listings
- Filter by location, experience range (min/max)
- Responsive design
- Dynamic job detail viewing
- Backend API with MongoDB integration

Tech Stack:-
- Frontend: React, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB

Setup Instructions

Prerequisites:-
- Node.js
- MongoDB
- npm

1. Backend Setup:-
- Clone repository:-
git clone <your-repo-url>
cd job-listings-app/backend

-Install dependencies:-
npm install express mongoose cors dotenv

-Start backend server:-
node server.js

2. Frontend Setup:-
cd ../frontend

-Install dependencies:-
npm install axios tailwindcss postcss autoprefixer

-Start development server:-
npm run dev

3. Database Initialization:-
Place your jobs.json in the backend folder

Import data by visiting (once):
http://localhost:5000/api/import

Project Structure:-
job-listings-app/
├── backend/
│   ├── server.js         # Express server
│   ├── models/Job.js     # MongoDB schema
│   ├── jobs.json         # Sample data
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main component
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    └── package.json

Assumptions and Challenges:-
- Data Import from JSON file. Due to Heavy Data, the code crashes and unale to run.
- The Output might not show Experiences ( min-max ).
- There is no description in any profile. So, there will be no desciption in the job card.
