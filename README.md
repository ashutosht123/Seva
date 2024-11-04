# Seva
Seva is a web app connecting food donors with recipients. Donors list extra food, and recipients can request items based on their needs. A search feature aids quick filtering, and the project is built with MVC architecture, deployed on Render.com.. https://seva-eb3t.onrender.com

![Screenshot 2024-08-10 113206](https://github.com/user-attachments/assets/a15b5fd0-6307-42bf-b5f1-4785397304b6)

## Note: 
1.While adding new listing add location only in this format, eg. Location : "Goa, India"

![Screenshot 2024-08-10 113328](https://github.com/user-attachments/assets/9b17bf8f-ca00-4ace-ba31-85027bb0ef33)
## Description
The Seva project is a web platform designed to simplify food donation and distribution. Users can list surplus food they wish to donate, while those in need can browse available listings and make requests based on specific needs. A search feature helps users find food items quickly by type or requirement. Built with MVC architecture for organized code structure, Seva is deployed on Render.com for easy online access.
## Features

- **Food Donation**: Donors can list surplus food on the platform with details like food type, quantity, and location.
- **Food Requesting**: Users in need of food can browse listings and send requests directly to donors, detailing their requirements.
- **Search Functionality**: A search bar enables users to filter food listings based on specific requirements, making it easier to find relevant items.
- **User Authentication & Authorization**: Managed via Passport for secure login and access control.
- **MVC Architecture**: The project is built using the MVC structure for better code organization and maintainability.
- **Deployment**: Hosted on Render.com for easy online access.

## Tech Stack

- **Frontend**: HTML, CSS, JAVASCRIPT 
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Hosting**: Render


## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ashutosht123/Wanderlust.git
    cd Seva
    ```

2. **Install dependencies:**

    ```bash
     npm install express
     npm install mongoose
     npm install path
     npm i ejs
     npm install -g nodemon
     npm install method-override
     npm install ejs-mate
     npm install dotenv
     npm install express-session
     npm install connect-mongo
     npm install cookie-parser
     npm install connect-flash
     npm install passport
     npm install passport-local
     npm install passport-local-mongoose
     npm i multer
     npm i dotenv 
     npm install cloudinary
     npm install multer-storage-cloudinary
     npm i connect-mongo 
     npm install @mapbox/mapbox-sdk
     npm install nodemailer
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `your project` directory and add the following:

    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    SECRET=your_jwt_secret
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    MAPBOX_TOKEN=your_mapbox_token
    ATLASDB_URL=your_atlasdb_url
    ```


4. **Run the application:**

    # Start server
     ```bash
    cd Seva
     ```
     ```bash
    nodemon app.js
     ```
    or
     ```bash
    node app.js
     ```
    
    The server will run on `http://localhost:7000`.

## Usage

- Visit the [live demo](https://seva-eb3t.onrender.com) to explore the application.  
- Register or log in to your account.  
- Browse and search for available food.  
- View detailed information about doneted food.  
- Request a food according to your needs.
