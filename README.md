Travel Itenerary Planner
Members:
  Francis Jay Abordo
  Oceane Rim Dardare(taking Appdev & Webdev2)
  Rev Martinez (Webdev2 collab)
  John Michael Villagomez


-------------------------------------------------------------------------------------------------------------------------------------------------------


Final Project - Travel Planner
Project Overview
This project involves setting up a full-stack web application for travel planning. It includes both a client-side (frontend) built with React and a server-side (backend) built with Node.js, Express, and PostgreSQL.

SETTING UP

    Create a folder in your file explorer- Folder Name: Final_Project
    Go to the terminal of the folder that you created to begin running a command

Creating an environment
    npm create vite@latest
    Name your project name: 
    Client
    Select Framework: 
    React
    Select Variant: 
    Javascript
    cd Travel_Planner
    npm install
    npm run dev

``Install Client Dependencies
    npm install -D tailwindcss react-router-dom axios
    npx tailwindcss init
    Tailwind
    Router DOM
    This is to handle the routing in react and it is found in the main.jsx file.
    @fortawesome/free-solid-svg-icons
    npm list @fortawesome/free-solid-svg-icons``

Tailwind is a third-party utility-first CSS framework, It writes styles directly on the jsx file
    without creating a CSS file. It would be easier to style in a frontend without looking where
    your CSS file directory is.

Create Server folder for the backends:
``Installing Dependencies
        npm install bcrypt body-parser dotenv express express-rate-limit joi
        jsonwebtoken morgan mysql mysql2 sequelize sequelize-cli pg axios cors nodemon--save-dev
        To run Nodemon add this to the scripts in 
        package.json``

file.
    Nodemon
        "start": "nodemon app.js"
    Files Added
        Server
            config
                databasepg.js
                controllers
                    user_controllers.js
            model
                userModel.js
        middleware
            rate_limiter
        routes
            routes.js
        .env
        app.js
    Client
    Not Yet Added

    databasepg.js
    This file is for connecting the backend to the postgreSQL database using sequelize.
    userModel.js
    This file is responsible for interacting with postgreSQL database with different functions like
    getting, adding, and deleting data to the database, also uses sequelize.
    user_controllers.js
    This file is for handling the data that is requested by the user. It calls a specific function from
    userModel so that it can returns a result or a response to the client.
    rate_limiter
    It is one of the middleware use to control the rate of request for API or to the server.
    routes.js
    This file is use for handling the routes of different requests.
    app.js
    This file is where we start the server running.
    .env
    Only the port number of the server is placed.

    Warning
    Create a database in postgreSQL before running your code and if you don't have one install it in https://www.postgresql.org/
    Guide:
        https://www.youtube.com/watch?v=qw--VYLpxG4

There will be no connection of the frontend and the backend if you don't separately run
them at the same time on a different terminal. Try using the split terminal in VS code.

    Client Folder
        npm run dev
    Server Folder
        Without nodemon
            node app.js
        With nodemon
            npm start








-------------------------------------------------------------------------------------------------------------------------------------------------------
Client/src/pages/Profile
                        /pfp.jsx
Profile Picture Management:

Upload: Handles image uploads using the handleImageChange function, converting files to Base64 strings for display.
Reset: Resets the profile picture to a placeholder using the resetProfileImage function.
Editable User Information:

Fields: Supports editing of name, email, phone number, birthday, and gender.
Toggle Edit Mode: The handleEditClick function switches between viewing and editing modes.
Dynamic Updates: The handleInputChange function updates state values for user fields.
Navbar:

Includes links to "Home," "Itinerary," "Discover," and "Profile."
Displays a "Welcome back" message and a notification counter.
Action Buttons:

Save changes, reset password, and log out for enhanced user control.
---------------------------------------------------
                        /calendarapp/calendar.jsx
Calendar View:

Month/Year View Toggle: Switch between month and year views using the toggleView function.
Render Calendar: Displays the days of the current month or year using renderCalendar and renderYearView functions.
Navigation: Navigate between months and years with handlePrevMonth, handleNextMonth, handlePrevYear, and handleNextYear functions.
Trip Management:

Upcoming Trips: Fetches and displays trips from the server using the useEffect hook and fetchEvents function.
Edit Trip: Allows editing of trips with the handleEditTrip function.
Create Trip: Navigates to the trip creation page using the handleCreateTrip function.
Calendar Header:

Displays the current month or year with navigation buttons (CalendarHeader component).
Event Fetching:

Fetches calendar events from a server using Axios (fetchEvents function), requiring an authorization token.
Styling and Layout:

Uses CSS (calendar.css) for styling the calendar, navbar, and trip cards.


---------------------------------------------------
                        /homepage/HomePage.jsx
User Profile Fetching:

Fetches user profile data from the server using Axios and stores it in the user state (getUserProfile function).
If no authentication token is found, the user is redirected to the login page.
Navigation and Layout:

Displays a top navigation bar with links to "Home," "Itinerary," "Discover," and "Profile" pages.
The user’s name is shown in the navigation, and a logout button is provided, removing the token and redirecting to the login page when clicked.
Map Section:

Displays an embedded Google Map with a location (University of San Carlos - Talamban Campus).
Provides a button to navigate to the trip planning page (/calendar).
Current Trips Section:

Displays a list of current trips with details like destination and dates.
Each trip is clickable, directing the user to the trip page.
Discover Section:

Presents curated destinations (Madrid, Kyoto) with an option to view more details.
Footer:

Contains links to the "About Us," "Privacy Policy," and "Terms of Service" pages.
Displays contact information and social media links for Facebook, Twitter, and Instagram.

---------------------------------------------------
                        /landingpage/LandingPage.jsx
Hero Section:

Displays a large introductory message with a call to action, encouraging users to turn their travel dreams into reality.
Contains navigation buttons to "Home" and "Contact" pages, and a logo at the top.
Main Call to Action:

Features a prominent "Login" and "Sign Up" button to allow users to access or create an account, guiding them to the login and registration pages.
Plan Trips Section:

Introduces the platform as a tool to help users plan trips, with an inspiring message.
Welcome Section:

Provides an introduction to the platform ("Vista"), describing its purpose, which is to offer curated itineraries for easy and exciting travel planning.
Emphasizes exploring both popular and hidden travel destinations.
Plan with Ease Section:

Highlights how the platform simplifies travel planning with an integrated map and user-friendly planner to avoid juggling multiple tabs.
Features an image that visually represents the concept of ease in planning.
Key Features Section:

Create: Explains how users can create their travel itineraries, track budgets, manage checklists, and receive suggestions.
Collaborate: Describes the feature that allows users to share their planning process with friends in a collaborative environment.
Commence: Encourages users to begin their adventures, with the support of integrated task management features to stay organized.
Browse Section:

Displays a recommendation for trips, encouraging users to explore and start planning with a call to action ("Let's do it" button).
Footer Section:

Includes a visual element (bot display image), likely representing a chatbot or assistant for user support.

---------------------------------------------------
                        /login/loginUser.jsx
Key Features and Functions:
State Management:

Uses useState to manage user input (data), error messages (error), and success messages (success).
The data state contains email and password fields for capturing user credentials.
Effect Hook:

Utilizes useEffect to ensure any existing authentication token is cleared from localStorage when the page loads.
Input Change Handler:

The handleInputChange function updates the data state for the respective input field (email or password) when the user types in the form fields.
Form Submission:

The handleSubmit function prevents the default form submission, validates the input fields, and sends a POST request to the server using axios to authenticate the user.
If the login is successful, it stores the authentication token in localStorage and redirects the user to the home page (/home).
Error or success messages are displayed to the user based on the response from the server.
Error Handling:

If the login request fails, the error message from the server (if available) is displayed. If not, a default error message is shown.
User Interface:

Form: A login form with email and password input fields, a login button, and a link for users who are not registered yet.
Logo: Displays a logo image (logoFinal.png) on the page.
Error and Success Messages: Conditional rendering of error and success messages depending on the form submission outcome.
Redirection:

After a successful login, the user is redirected to the /home page.
If the login credentials are invalid, an error message is shown to guide the user.

---------------------------------------------------
                        /register/registerUser.jsx
State Management:

Uses useState to manage user input (data), error messages (error), and success messages (success).
The data state includes the email, password, first_name, and last_name fields for capturing user information during registration.
Input Change Handler:

The handleInputChange function updates the data state for the respective input field (email, password, first_name, or last_name) when the user types in the form fields.
Form Submission:

The handleSubmit function prevents the default form submission, validates that all fields are filled, and sends a POST request to the server using axios to register the user.
If the registration is successful (response status 201), it resets the form fields and displays a success message.
If registration fails, an error message from the server (if available) is displayed, and the success message is cleared.
Error Handling:

Displays an error message if any of the input fields are missing or if the request fails.
Success message is cleared when an error occurs, ensuring only one type of feedback is shown at a time.
User Interface:

Form: A registration form with fields for email, password, first_name, and last_name.
Error and Success Messages: Conditional rendering of error and success messages depending on the form submission outcome.
Logo: Displays a logo image (logoFinal.png) on the page.
Redirect Link: Provides a link for users who already have an account to navigate to the login page.
Redirection:

If registration is successful, the user remains on the registration page, and a success message is shown.
If an error occurs, the error message is displayed without redirection.

---------------------------------------------------
                        /tripplanner/TripPlanner.jsx
State Management:

Uses useState to manage:
trips: Holds the list of trips fetched from the server.
error: Displays error messages for API issues or validation failures.
tripData: Contains all the input data for the trip, such as departure/arrival dates, title, destination, and activities.
Fetching Data:

The useEffect hook is used to fetch the trips when the component mounts.
If the user is in edit mode (isEditMode), another useEffect hook fetches the specific trip data using the tripId.
Event Handlers:

handleChange: Updates the tripData state for text inputs (e.g., departure date, title).
handleActivityChange: Updates individual activity details (name, place, date, etc.).
addActivity: Adds a new activity to the trip's activities array.
handleCountrySelect and handleCitySelect: Updates the destination country and city based on user input from the CityCountryAutocomplete component.
handleSave: Sends a PUT request to update the trip data when the user is editing a trip.
handleDelete: Sends a DELETE request to remove the trip when in edit mode.
handleSubmit: Sends a POST request to create a new trip.
Form Submission:

On form submission, the handleSubmit function is called to either create or update the trip.
Ensures all required fields are filled before submission.
After successful submission, redirects to the /calendar page with a state that indicates a refetch is needed.
Date and Time Handling:

The departureDate and arrivalDate fields are converted to a "Month Day" format when set.
Activities Management:

Users can add multiple activities to a trip. Each activity includes details such as name, place, date, time range, and description.
City and Country Autocomplete:

Uses the CityCountryAutocomplete component to allow users to select cities and countries for the trip's destination.
Navigation and Error Handling:

Redirecting: If the user is not logged in, they are redirected to the login page.
Displays error messages when something goes wrong, such as missing fields or API errors.
UI Components:

Navbar: Includes links to different sections (Home, Itinerary, Discover, Profile) and displays a welcome message with the user's name.
Form: A dynamic form that allows the user to input trip details, activities, and notes. The form conditionally renders either a "Save" and "Delete" button for editing an existing trip or a "Create Trip" button for new trips.
Conditional Rendering:

The form changes based on whether the user is in edit mode (isEditMode). If true, the user can update or delete a trip. If false, the user is creating a new trip.

---------------------------------------------------
                        /tripplanner/CityAutocomplete.jsx

It looks like you're building an autocomplete feature for selecting countries and cities. Here's a detailed breakdown of what you're aiming to do and how the implementation might work:

Components:
CountryAutocomplete: A component that takes an initialCountry prop and uses it to filter through the list of countries. It allows the user to type in the name of a country, and based on the input, it filters the countries and displays matching results.
City Autocomplete: The cities are stored by country, and based on the selected country, the cities will dynamically be filtered.
What the code does:
CountryAutocomplete maintains state variables like inputValue, showSuggestions, and filteredCountries.
The cities object contains a mapping of countries to a list of cities.
The countries array stores the list of country names.

---------------------------------------------------
Client/src/routes/appRoutes.js
Here’s a breakdown of how the file works:

Imports: The file imports various components (like Home, Login, Register, etc.) from their respective paths.

appRoutes Array: This array contains objects that specify the paths and associated components. Each object has:

path: The URL path for the route (e.g., '/' or '/login').
component: The React component that should render when the user visits the corresponding path.
Catch-all Route: The { path: '*', component: NotFound } is a fallback route that renders the NotFound component for any undefined paths.

Exporting Routes: The appRoutes array is exported so it can be used in other parts of your application (for example, in a routing system like React Router).















/server
        /associations/associationsEntity.js
This code defines a many-to-many relationship between two models: Destination and Activity, using Sequelize, an ORM for PostgreSQL. It achieves this by introducing a junction table, DestinationActivity, that holds foreign keys linking Destination and Activity.

Key features:

Many-to-Many Relationship: A destination can have multiple activities, and an activity can occur at multiple destinations.
Model Associations: The Destination and Activity models are linked through the DestinationActivity model using belongsToMany.
Seamless Querying: With these associations, related data can be easily queried, allowing developers to fetch all activities for a destination or all destinations for an activity.
Sequelize Integration: Sequelize manages the relationships, making database interactions cleaner and more abstracted.


---------------------------------------------------
Server/controllers/calendar_controllers.js
The getUpcomingTripsController function is responsible for fetching upcoming trip data, which includes destinations and their associated activities, from the database using Sequelize ORM. Here's a breakdown of its functionality:

Database Query:

It queries the Destination model to retrieve all destinations (findAll method).
For each destination, it includes associated Activity records. This is done using the include option, which establishes a relationship between the Destination and Activity models.
The through: { attributes: [] } option specifies that the intermediate table (DestinationActivity) should be included but without returning any of its columns (e.g., it avoids returning the junction table data itself).
Error Handling:

If the query is successful, it sends a 200 status response along with the Destination_Plan data (which includes destinations and activities).
If an error occurs while fetching the data, it catches the error, logs it to the console, and returns a 500 status with a generic error message (Failed to fetch trips).
Response:

On successful execution, the function sends a JSON response with the destination plans (destinations and associated activities).
If there's an error, it sends a response with the status code 500 and an error message.
In summary, this controller function retrieves a list of destinations and their related activities from the database and handles both successful and failed database interactions by sending appropriate responses to the client.


---------------------------------------------------
Server/controllers/destAct_controllers.js

1. create_destAct_Controller
Functionality:

This controller is used to create a new destination and its associated activities.
It first validates the required fields (like from, to, departureDate, departureTime, etc.) from the request body.
A new Destination is created with the provided details.
If activities are included in the request, it loops through the activities, creates each activity, and associates it with the newly created destination via the DestinationActivity join table.
If no activities are provided, the controller skips the activity creation part.
Returns a success response with the newly created destination and a message.
Key Features:

Input Validation: Ensures required fields are present before proceeding.
Associating Activities: Handles creation of related activities and linking them to the destination.
Error Handling: Catches errors during destination and activity creation, sending relevant error responses.
2. getDestinationByIdController
Functionality:

This controller retrieves a destination by its ID from the database, including its associated activities.
It uses the Destination.findOne() method to fetch the destination along with its associated activities by utilizing Sequelize's include feature.
If the destination is not found, it returns a 404 status with an error message.
Otherwise, it returns the destination data along with associated activities.
Key Features:

Find Destination by ID: Retrieves a specific destination based on the given ID.
Associations: Includes associated activities for the destination.
Error Handling: Handles the case where the destination is not found.
3. updateDestinationController
Functionality:

This controller is used to update an existing destination with new details.
It first checks if the destination exists based on the provided ID.
Then, it updates the destination's fields (from, to, departureDate, etc.) with the new data from the request body.
If activities are provided, it creates new activities and associates them with the destination.
The controller ensures the destination is updated successfully, sending a success response.
Key Features:

Destination Update: Allows updating the details of an existing destination.
Activity Handling: Creates new activities and associates them with the destination during the update process.
Error Handling: Checks if the destination exists and handles any issues that arise during the update process.
4. deleteDestinationActivityAndDestinationIdController
Functionality:

This controller deletes a destination and its associated activities based on the destination's ID.
It first fetches all activities associated with the destination using DestinationActivity.findAll().
It then deletes the destination-activity associations (DestinationActivity.destroy()), followed by the deletion of the destination itself.
For each associated activity, the controller deletes the activity (Activity.destroy()).
If no records were deleted, it returns a 404 status. If the deletion is successful, it sends a success message.
Key Features:

Cascade Deletion: Deletes a destination along with its associated activities.
Activity Deletion: Ensures that all activities related to the destination are also deleted.
Error Handling: Handles cases where no records are found or deleted, ensuring a clean response.
Summary of Functionality
These controllers collectively manage the full lifecycle of a destination and its associated activities:
Create: Add a new destination with activities.
Read: Fetch destination details by ID.
Update: Modify existing destination details, adding new activities.
Delete: Remove a destination and its related activities from the database.
Each operation ensures that destination and activity records are properly linked using the DestinationActivity join table, and includes necessary error handling and validation to ensure smooth functionality.


---------------------------------------------------
Server/controllers/user_controllers.js

1. getAllUsersController
Functionality:

This controller fetches all users from the database by calling the getAllUsers function.
It logs the details of each user (ID, email, and password) for debugging purposes.
If no users are found, it returns a 404 status with a message indicating no users were found.
If users are found, it returns the list of users as a response with a 200 status.
Key Features:

Fetch Users: Retrieves a list of all users.
Debug Logging: Logs user details for debugging (can be removed for production).
Error Handling: Handles the case when no users are found and returns the appropriate message.
2. registerUserController
Functionality:

This controller handles the user registration process.
It first validates the incoming request body using Joi to ensure required fields are present (email, password, first_name, and last_name).
It checks if the provided email already exists in the database and if the email format is valid.
If the email does not exist and is valid, it hashes the password using bcrypt and creates a new user in the database using the registerUser function.
It then returns a 201 status with a success message and the newly registered user's details.
Key Features:

Input Validation: Ensures all required fields are provided and validates email format.
Email Uniqueness Check: Verifies that the email does not already exist in the database.
Password Hashing: Uses bcrypt to securely hash the password before saving it.
Error Handling: Handles errors related to input validation and registration, returning appropriate error messages.
3. loginUserController
Functionality:

This controller handles user login.
It checks if the user exists by searching for their email in the database.
If the user exists, it compares the provided password with the stored hashed password using bcrypt.
If the passwords match, it generates a JWT token containing the user's ID and email and returns it in the response.
If there are any issues (e.g., invalid credentials), it returns a corresponding error message.
Key Features:

User Authentication: Verifies user credentials (email and password).
JWT Token Generation: Creates and returns a JWT token on successful login.
Error Handling: Handles cases where the user does not exist or the password is incorrect.
4. fetchUserProfile
Functionality:

This controller fetches the profile of the currently authenticated user based on the JWT token.
It checks if the user is authenticated by verifying the presence of req.user.email.
If the user is authenticated, it retrieves the user's profile from the database and returns it in the response.
If the user is not authenticated or their profile cannot be found, it returns an error message.
Key Features:

Authentication Check: Ensures the user is authenticated before allowing profile access.
Fetch User Profile: Retrieves and returns the profile of the authenticated user.
Error Handling: Handles cases where the user is not authenticated or the profile is not found.



---------------------------------------------------
Server/middleware/auth_token.js

authToken Middleware
This is a middleware function used for authenticating requests based on JWT (JSON Web Tokens). It ensures that the request has a valid JWT before proceeding to the next route handler.

Functionality:

Extracting the Token:
The middleware first checks if the request has an Authorization header.
If present, it splits the value by space and retrieves the token (which is expected to be in the format Bearer <token>).
Token Verification:
If the token is missing, it sends a 401 Unauthorized status code, indicating that authentication is required.
If the token is present, the middleware uses jwt.verify to validate the token using the secret key stored in process.env.JWT_SECRET.
If the token is invalid or expired, it sends a 403 Forbidden status code, indicating that the user does not have permission to access the requested resource.
Decoded Payload:
If the token is successfully verified, the payload (user information, such as id and email) is extracted from the token and logged for debugging purposes.
Attaching User to Request:
After successful verification, the decoded user information is added to the req.user object, making it accessible to other parts of the application.
Proceeding to Next Middleware/Route:
The next() function is called to pass control to the next middleware or route handler.
Key Features:

Token Extraction: Extracts the token from the Authorization header.
Token Validation: Uses jwt.verify to check the validity of the token with a secret key.
Error Handling: Sends appropriate status codes (401 for missing token, 403 for invalid token) if the token is not valid.
User Data: After verification, the user's data is attached to req.user for further use in the application.




---------------------------------------------------
Server/middleware/logging_mid.js

Key Features and Functionality Explanation
loggingMiddleware
This middleware is used to log HTTP requests in a detailed manner for monitoring and debugging purposes. It utilizes the morgan logging library along with custom enhancements to log incoming request details.

Functionality:

Morgan Logging:
The middleware starts by using morgan('dev') to log requests in the "dev" format, which is a pre-defined short log format that includes information like HTTP method, URL, response status code, and response time.
Custom Request Logging:
After calling the morganFormat to log the basic request data, the middleware logs additional information:
Timestamp: The date and time when the request was received.
HTTP Method: The type of HTTP request (e.g., GET, POST).
Request URL: The original URL or route that was requested.
Request Headers: Logs the full headers of the incoming request.
Request Body: If a request body is present (i.e., the body is not empty), it logs the body content in a formatted JSON structure. If the body is empty, it logs an "END" message.
Logging Structure:
The logs are clearly structured and separated by lines for readability, providing a clear visual distinction between different requests.
Next Middleware:
After logging the request details, the next() function is called, passing control to the next middleware or route handler.
Key Features:

Enhanced Logging: Combines morgan for standard logging and custom code to log request details such as headers and body.
Timestamp: Includes the timestamp for each request, making it easy to track when a request occurred.
Request Method and URL: Logs the HTTP method (GET, POST, etc.) and the requested route.
Body and Headers Logging: Logs the request body (if provided) and headers, offering a complete picture of the incoming request.
Readable Output: Structured output with clear separators and indentation for readability.



---------------------------------------------------
Server/middleware/rate_limiter.js

rateLimiterMiddleware
This middleware is used to limit the rate of incoming requests to the server in a specified time window, preventing abuse or overload of the server. It uses the express-rate-limit library to define request limits for an API or server.

Functionality:

Rate Limiting:
The middleware limits the number of requests a client can make within a specific time window.
In this case, it is set to allow a maximum of 10 requests within a 10-second window (windowMs: 1 * 10 * 1000), which translates to 10,000 milliseconds (10 seconds).
Error Message:
If a client exceeds the allowed request limit, the middleware responds with an error message: "Too many requests. Please try again later".
Response Headers:
The middleware also adds relevant headers to the response to inform the client about their request limit status.
These headers help the client know how many requests they have left and when the limit will reset.
Key Features:

Window Period: The windowMs parameter defines the time window for rate limiting, which is set to 10 seconds in this case.
Maximum Requests: The max parameter defines the maximum number of requests allowed within the time window (10 requests in this case).
Custom Error Message: The message option provides a user-friendly error message when the rate limit is exceeded.
Headers: The headers option is enabled, meaning rate limit information will be included in the response headers.








---------------------------------------------------
Server/model/activityModel.js



Activity Model
This code defines a Sequelize model for the Activity entity, which represents activities related to a travel destination. The model is associated with a PostgreSQL database via Sequelize, and it includes several fields with their respective data types and constraints.

Key Features:
Sequelize Model Definition:

The model defines the structure for the Activity table in the database.
id is the primary key and is auto-incremented for each new activity.
Attributes:

activity_name: A required field of type STRING, storing the name of the activity.
activity_description: An optional STRING field that stores a description of the activity.
venue: An optional STRING field to store the venue or location where the activity takes place.
date: An optional DATE field that represents the date of the activity.
time_start: An optional TIME field for the activity's start time.
time_end: An optional TIME field for the activity's end time.
Database Synchronization:

sequelize.sync(): This method synchronizes the Activity model with the database, ensuring the table is created if it doesn't exist or is updated if there are any changes to the model.
Table Name and Timestamps:

tableName: 'Activities': This specifies that the table in the database will be named Activities.
timestamps: false: Disables automatic creation of createdAt and updatedAt fields for the table.
Functionality:
This model defines how activities related to trips are stored in the database, with specific attributes for each activity. It allows you to create, read, update, and delete activities from the database while ensuring the data integrity with proper validation (e.g., required fields).

How It Works:
The Activity model represents a database table called Activities.
It has attributes such as activity_name, activity_description, venue, date, time_start, and time_end.
It is synced with the PostgreSQL database, and when an activity is added, it automatically creates a new record in the Activities table.









---------------------------------------------------
Server/model/destinationActivityModel.js

Key Features:
Sequelize Model Definition:

This model defines the structure of the DestinationActivity table that connects Destination and Activity entities.
destination_activity_id serves as the primary key and is auto-incremented for each new record.
Attributes:

destination_activity_id: The primary key for the DestinationActivity table, auto-incremented for each new record.
destination_id: A foreign key that references the id column of the Destination table. This field cannot be null.
activity_id: A foreign key that references the activity_id column of the Activity table. This field can be null, allowing for flexibility in linking activities to destinations.
Database Synchronization:

sequelize.sync(): This method synchronizes the DestinationActivity model with the database. It ensures that the table is created if it doesn't exist or updated if necessary.
Table Name and Timestamps:

tableName: 'Destination_Activities': Specifies that the table in the database will be named Destination_Activities.
timestamps: false: Disables the automatic creation of createdAt and updatedAt fields for the table.
Functionality:
The DestinationActivity model defines the relationship between destinations and activities. This model allows us to store the many-to-many relationship between the two entities.
The createDestinationActivities function simplifies the process of creating new entries in the DestinationActivity table. It takes a destinationModelId and activityId, and creates a new record linking the destination and activity.
How It Works:
Foreign Key Relationship:

The model establishes foreign key constraints on destination_id and activity_id, linking the DestinationActivity table to the Destination and Activity tables, respectively.
The destination_id field is required, meaning every destination activity must be linked to a destination. The activity_id can be optional (null), allowing the possibility of having no activities for a given destination.
Creating Destination-Activity Entries:

The createDestinationActivities function allows you to link a destination and an activity. By passing the destinationModelId (the destination's id) and the activityId (the activity's id), a new record is created in the DestinationActivity table.




---------------------------------------------------
Server/model/destinationModel.js

Key Features:
Sequelize Model Definition:

The model defines the structure of the Destination table in the database, with various fields related to the trip details.
Attributes:

id: The primary key for the Destination table, set to auto-increment with each new record.
from: A string field representing the origin of the trip. This field is required and cannot be empty.
to: A string field representing the destination of the trip. This field is required and cannot be empty.
departureDate: A date field representing the departure date. It is required and must be a valid date.
departureTime: A string field representing the departure time. This field is required and cannot be empty.
arrivalDate: A date field representing the arrival date. It is required and must be a valid date.
arrivalTime: A string field representing the arrival time. This field is required and cannot be empty.
title: A string field representing the title of the trip (e.g., "Business Trip" or "Holiday"). This field is required and cannot be empty.
destinationCountry: A string field for the country of the destination. This field is required and cannot be empty.
destinationCity: A string field for the city of the destination. This field is required and cannot be empty.
Validations:

Each field has validation rules:
notEmpty: Ensures that the field is not empty (for fields like from, to, departureTime, etc.).
isDate: Ensures that the field value is a valid date (for departureDate and arrivalDate).
Database Synchronization:

The model is synchronized with the database through sequelize.sync(), ensuring that the table structure matches the defined model.
Timestamps are enabled by default (timestamps: true), meaning Sequelize will automatically create createdAt and updatedAt columns.
Table Name:

tableName: 'Destination': Specifies that the table in the database is named Destination.
Functionality:
The Destination model defines the structure of a destination record in the system. It is used to store and manage information about trips, including departure and arrival details, as well as the destination's location.
The validation rules ensure that all required fields are properly populated, and that date fields contain valid date values.



---------------------------------------------------
Server/model/userModel.js

Key Features:
Sequelize Model Definition:

The User model defines the structure of the users table in the database.
Attributes:

id: The primary key for the users table, auto-incremented with each new record.
email: A string field for the user's email, which is unique and cannot be null.
password: A string field for the user's password, which cannot be null.
first_name: A string field for the user's first name, which cannot be null.
last_name: A string field for the user's last name, which cannot be null.
gender: A string field for the user's gender. It is optional.
birthday: A date field for the user's birthday. It is optional.
number: A string field for the user's phone number. It is optional.
Table Configuration:

The table name is explicitly defined as users with tableName: 'users'.
timestamps: false: Disables automatic timestamp columns (createdAt, updatedAt) from being added to the table.
Methods:

getAllUsers: This function retrieves all users from the database by calling User.findAll().
registerUser: This function creates a new user in the database by calling User.create() with the provided user data.
findUserByEmail: This function retrieves a user by their email using User.findOne(), which matches the provided email in the database.
Password Handling (Using bcrypt):

Although not explicitly shown in this snippet, typically password hashing using bcrypt would be done in the registerUser function before saving the password to the database, ensuring that the password is not stored in plain text.
Database Synchronization:

The model is synchronized with the database using sequelize.sync(). This ensures that the users table structure is in sync with the defined model.
If an error occurs during synchronization, it is logged to the console.

