# ArogyaShayak 🏥

**ArogyaShayak** is a comprehensive healthcare assistance platform designed to help patients navigate the healthcare system in India. It provides easy access to hospital information, government schemes, affordable accommodation, and AI-powered health assistance.

## 🌟 Features

*   **🏥 Hospital Discovery**: Find hospitals based on location, specialty, and name. Includes geo-spatial search to find the nearest facilities.
*   **📜 Ayushman Bharat Schemes**: Explore covered treatments, check eligibility, and understand benefits under the PM-JAY scheme.
*   **🏠 Affordable Stays**: Locate affordable accommodation options like Dharamshalas, Hostels, and Guest Houses near hospitals.
*   **🤖 AI Health Assistant**: A smart chatbot powered by Google's Gemini API to answer health-related queries and provide guidance.
*   **🌗 Dark Mode**: Fully responsive UI with seamless dark mode support.
*   **🔐 User Authentication**: Secure login and registration for personalized experiences.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Theme**: `next-themes` for Dark Mode

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
*   **Authentication**: JWT (JSON Web Tokens)
*   **AI**: Google Gemini API (`@google/generative-ai`)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Shubhamkr585/ArogyaShayak.git
    cd ArogyaShayak
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory with the following variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```
    Start the backend server:
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**
    Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    npm install
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
