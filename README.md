# ArogyaShayak 🏥

**ArogyaShayak** is a dedicated healthcare assistance platform with a primary mission: **to raise awareness about the Ayushman Bharat scheme** and connect patients with empanelled hospitals.

Our goal is to empower users by providing detailed information on:
1.  **Ayushman Bharat Empanelled Hospitals**: Which hospitals are covered and what specific specialties/services they offer.
2.  **Comprehensive Care Planning**: If a user chooses a hospital, we provide a complete plan including **travel costs**, **nearby affordable stays**, and **total estimated costs** for their visit.

## 🌟 Features

*   **🏥 Smart Hospital Discovery**: Search for Ayushman Bharat empanelled hospitals by location, specialty, and name. View detailed profiles listing available services and specialties.
*   **�️ Comprehensive Visit Planning**: Get a complete itinerary for your treatment journey, including:
    *   **Travel Cost Estimation**: Estimated travel expenses to the hospital.
    *   **Accommodation Finder**: Affordable stays (Dharamshalas, Hostels) near the hospital with pricing.
    *   **Total Cost Projection**: A holistic view of potential expenses.
*   **📜 Scheme Awareness**: Detailed catalog of Ayushman Bharat covered treatments, eligibility criteria, and benefits.
*   **🤖 AI Health Assistant**: A smart chatbot to guide you through the scheme details and help plan your medical journey.
*   **🌗 Dark Mode**: Accessible UI with full dark mode support.

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
