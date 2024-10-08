# Guest Room Booking Application


## Overview

The Room Booking App is a web application designed for browsing, viewing, and booking rooms. It provides user authentication, room management, and booking functionalities, with separate interfaces for customers and house owners to ensure a seamless user experience.

## Features

- **Home Page**: Features an introductory section with a carousel of room highlights and a call-to-action button for exploring rooms.
- **Room Details Page**: Displays detailed information about a room, including a description, photos, price, and amenities.
- **User Authentication**: Allows users to register and log in.
- **Owner Dashboard**: Provides house owners with tools to manage their rooms.
- **Customer Dashboard**: Enables customers to browse available rooms, view details, and make bookings.

## Project Structure

### Frontend

- `src/pages/HomePage.js`: Main page showcasing the introduction and room photo carousel.
- `src/pages/LoginPage.js`: User login page.
- `src/pages/RegisterPage.js`: User registration page.
- `src/pages/OwnerDashboard.js`: Dashboard for house owners to manage rooms.
- `src/pages/CustomerDashboard.js`: Dashboard for customers to view and book rooms.
- `src/pages/RoomDetailsPage.js`: Page showing details of a specific room.
- `src/pages/AddRoom.js`: Form for house owners to add new rooms.
- `src/pages/UpdateRoom.js`: Form for house owners to update room details.
- `src/styling/HomePage.css`: CSS file for styling the home page.
- `src/styling/RoomDetailsPage.css`: CSS file for styling the room details page.
- `public/photos/`: Directory containing room photos used in the carousel.

### Backend

- `backend/authController.js`: Handles user authentication, including login and registration.
- `backend/roomController.js`: Manages room-related operations (CRUD).
- `backend/bookingController.js`: Manages booking operations.
- `backend/User.js`: User model schema.
- `backend/Room.js`: Room model schema.
- `backend/Booking.js`: Booking model schema.
- `backend/authRoutes.js`: Routes for user authentication.
- `backend/roomRoutes.js`: Routes for room management.
- `backend/bookingRoutes.js`: Routes for booking management.
- `backend/authMiddleware.js`: Middleware for JWT authentication.
- `backend/server.js`: Main server setup file.
- `backend/fileUpload.js`: Handles file uploads (e.g., room photos).

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (for database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Room_Booking
 2 Install dependencies:
  For the backend:
   cd backend
npm install
   For the frontend:
    cd ../frontend
  npm install
 3. Set up environment variables:
 MONGODB_URI=mongodb://localhost:27017/room_booking
JWT_SECRET=your_jwt_secret

/**Usage**/
Register and Log In:

Access the application via http://localhost:3000.
Use the registration page to sign up as a House Owner or Customer.
Log in to access your dashboard and manage bookings.
For House Owners:

After logging in, you can add and manage rooms from the Owner Dashboard.
View bookings and room details.
For Customers:

/**Browse available rooms and view details.**/
Use the booking form to select dates, enter details, and book rooms.
/**API Endpoints**/
Authentication
POST /api/register - Register a new user.
POST /api/login - Log in and receive a JWT token.
/**Rooms**/
GET /api/rooms - Get a list of all available rooms.
GET /api/rooms/:id - Get details of a specific room.
POST /api/rooms - Add a new room (House Owners only).
PUT /api/rooms/:id - Update room details (House Owners only).
DELETE /api/rooms/:id - Delete a room (House Owners only).
/**Bookings**/
POST /api/bookings - Create a new booking.
GET /api/bookings/:id - Get details of a specific booking (for logged-in user).
## OUTPUT
/** Home,Registartion,Login**/
![Screenshot 2024-07-13 214348](https://github.com/user-attachments/assets/65123cdc-a65a-472a-b854-6ec637dc1654)
![Screenshot 2024-07-13 215109](https://github.com/user-attachments/assets/f4795cfd-d7b5-465a-9b5f-1dcd35e7e420)
![Screenshot 2024-07-13 215101](https://github.com/user-attachments/assets/6b577a6e-bf72-4796-ab17-832cafa0c38e)
/**Owner DashBoard**/
![Screenshot 2024-07-13 215001](https://github.com/user-attachments/assets/c9df1038-8db2-4412-a229-2fca211e7f2e)

/**customer DashBoard**/
![Screenshot 2024-07-13 220609](https://github.com/user-attachments/assets/f8df6bb8-6840-4b11-9d6b-0b5e43519bb7)
![Screenshot 2024-07-13 220601](https://github.com/user-attachments/assets/b0672a13-cf88-46d4-b6f3-cdedf9f90c0e)
![Screenshot 2024-07-13 220427](https://github.com/user-attachments/assets/c8561525-e4a7-406a-8d89-2f3374fbe1a9)

/**Booking Form**/
![Screenshot 2024-07-13 220631](https://github.com/user-attachments/assets/65a129f2-401b-4267-a374-fb64d22166fd)


