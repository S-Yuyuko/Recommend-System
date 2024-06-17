
# Movie Recommendation System

This is a movie recommendation system built using React for the frontend, Node.js for the backend, and Python for data processing and algorithms. The application allows users to browse movies by genre, like movies, rate them, and get personalized recommendations based on their preferences.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse movies by genre
- Like and rate movies
- Get personalized movie recommendations
- Responsive design
- Modal dialog for displaying recommendations

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Data Processing and Algorithms**: Python
- **Styling**: CSS

## Project Structure

\`\`\`
├── .vscode                 # VSCode configuration files
│   └── ...
├── Node                    # Node.js backend directory
│   ├── server.js           # Node.js server script
│   └── package.json        # Node.js dependencies
├── recommend-system        # Python backend directory
│   ├── app.py              # Python backend script for data processing
│   └── requirements.txt    # Python dependencies
└── README.md               # Project documentation
\`\`\`

## Setup and Installation

### Prerequisites

- Node.js and npm
- Python and pip

### Backend Setup

1. **Clone the repository**:
    \`\`\`bash
    git clone https://github.com/your-username/movie-recommendation-system.git
    cd movie-recommendation-system
    \`\`\`

2. **Set up Python backend**:
    \`\`\`bash
    cd recommend-system
    pip install -r requirements.txt
    \`\`\`

3. **Run the Python backend**:
    \`\`\`bash
    python app.py
    \`\`\`

### Frontend Setup

1. **Set up Node.js server**:
    \`\`\`bash
    cd ../Node
    npm install
    \`\`\`

2. **Run the Node.js server**:
    \`\`\`bash
    node server.js
    \`\`\`

3. **Set up React frontend**:
    \`\`\`bash
    cd ../frontend
    npm install
    \`\`\`

4. **Run the React frontend**:
    \`\`\`bash
    npm start
    \`\`\`

## Usage

1. Open your browser and navigate to \`http://localhost:3000\` to use the application.
2. Select genres to browse movies.
3. Click on a movie card to like it.
4. Use the star rating component to rate liked movies.
5. Submit your liked movies to get recommendations.
6. View recommendations in the modal dialog.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature-branch\`).
3. Make your changes.
4. Commit your changes (\`git commit -m 'Add some feature'\`).
5. Push to the branch (\`git push origin feature-branch\`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
