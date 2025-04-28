FoodNutrients - Fullstack Web Application
FoodNutrients is a fullstack web application designed to help users search for food items and get detailed nutrition information.
It consists of two parts:

Frontend: built with React, Bootstrap, and JavaScript

Backend: built with Node.js, Express, and integrates with the USDA API for food nutrition data

Technologies Used
Frontend: React, Bootstrap, JavaScript

Backend: Node.js, Express, MongoDB, JWT Authentication

External API: USDA FoodData Central API

Project Structure
bash
Copy
Edit
/ (root)
├── backend/    # Node.js + Express backend
├── frontend/   # React frontend
├── README.md   # This file
├── .gitignore
Main Features
Food Search: Search for food items and view detailed nutrient information

User Authentication: Register, login, and manage user sessions

Personal Food List: Save selected foods to a personal list

Admin Functions: Create and manage user accounts (admin only)

Installation & Running the Project
Clone the repository

bash
Copy
Edit
git clone https://github.com/cherryliuliuchen/FoodNutrientsSearch.git
Install backend dependencies

bash
Copy
Edit
cd backend
npm install
Install frontend dependencies

bash
Copy
Edit
cd ../frontend
npm install
Setup environment variables
Create a .env file inside the backend folder:

ini
Copy
Edit
PORT=3000
DATABASE_URL=your-mongodb-url
JWT_SECRET=your-jwt-secret
USDA_API_KEY=your-usda-api-key
Run backend

bash
Copy
Edit
cd backend
npm run dev
Run frontend

bash
Copy
Edit
cd frontend
npm start
Contact
If you have any questions or feedback, feel free to reach out:

Email: cherryliuliuchen@gmail.com

🚀 Thank you for checking out FoodNutrients!
