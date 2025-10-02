# WIP - NextWatch AI

NextWatch AI is an intelligent movie suggestion application that helps you discover your next favorite film. By leveraging the power of AI, it provides personalized recommendations based on your prompts or even your own list of movies.

## Features

-   **AI-Powered Suggestions**: Get movie recommendations by describing what you're in the mood for.
-   **CSV File Upload**: Upload your movie watchlist from services like IMDb or Letterboxd (as a `.csv` file) to get suggestions from a list you already know.
-   **Detailed Information**: View comprehensive details for each suggested movie, including the poster, rating, runtime, genre, overview, trailer, and more.
-   **Modern Tech Stack**: Built with React, Node.js, and Vite for a fast and responsive user experience.

## Technologies Used

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **APIs**:
    -   **OpenRouter**: For generating AI-based movie choices.
    -   **TMDB (The Movie Database)**: For fetching detailed movie information.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v20.x or later recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   **TMDB API Key**: You can get one for free from [the TMDB website](https://www.themoviedb.org/settings/api).
-   **OpenRouter API Key**: Available from the [OpenRouter.ai website](https://openrouter.ai/).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nextwatch-ai.git
    cd nextwatch-ai
    ```

2.  **Install dependencies:**
    This project uses a single `package.json` for both client and server dependencies.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file inside the `server/` directory.
    ```bash
    touch server/.env
    ```
    Add the following content to `server/.env`, replacing the placeholders with your actual API keys:

    ```env
    # Get your API key from https://www.themoviedb.org/
    TMDB_API_KEY="your_tmdb_api_key"

    # Get your API key from https://openrouter.ai/
    OPENROUTER_API_KEY="your_openrouter_api_key"

    # Optional: Set the server port (defaults to 3001)
    PORT=3001
    ```

## Running the Application

You need to run the backend server and the frontend development server in two separate terminals.

1.  **Start the backend server:**
    In your terminal, from the root directory of the project, run:
    ```bash
    node server/server.js
    ```
    The server will start on `http://localhost:3001` (or the port you specified in `.env`).

2.  **Start the frontend development server:**
    In a new terminal, from the root directory, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

Now you can open your browser and navigate to the frontend URL to use the application.

## How It Works

1.  The user enters a prompt (e.g., "a sci-fi movie in a galaxy far, far away...") and optionally uploads a CSV file.
2.  The React frontend sends this data to the Express.js backend.
3.  The backend forwards the prompt and CSV content to the OpenRouter API, which returns the title and year of a single movie.
4.  The backend then uses the TMDB API to find the movie by its title and year, gathering detailed information like its poster, rating, cast, and trailer.
5.  This complete movie suggestion is sent back to the frontend and displayed to the user.