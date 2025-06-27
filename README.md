# Artifacta - Historical Artifacts Tracker

![Artifacta Banner](https://i.ibb.co/fd09HRhY/Screenshot-10.png)

Artifacta is a comprehensive web application designed for tracking and exploring historical artifacts from around the world. From the Rosetta Stone to the Antikythera Mechanism, Artifacta provides a platform for enthusiasts to discover, contribute, and engage with historical treasures.

## Live Demo

[View Live Site](https://artifacta-5240f.web.app/)

## Features

- **User Authentication**: Secure login with email/password and Google authentication
- **Artifact Management**: Add, view, update, and delete artifact entries
- **Interactive Features**: Like artifacts and track your favorites
- **Responsive Design**: Fully functional across mobile, tablet, and desktop
- **Dynamic Content**: Featured artifacts based on popularity
- **Personal Collections**: View artifacts you've added or liked
- **Search Functionality**: Easily find specific artifacts by name
- **Modern UI**: Clean, intuitive interface with animations
- **ArtifactAIAssistant**: Auto-generate descriptions or historical context 

## Technologies Used

### Frontend
- React.js
- Tailwind CSS with DaisyUI
- Framer Motion for animations
- React Router for navigation
- Firebase Authentication
- Axios for API calls
- React Hook Form for form handling
- SweetAlert2 for notifications

### Backend
- Node.js with Express
- MongoDB for database
- JSON Web Tokens (JWT) for authentication
- Vercel for server hosting

## Installation

To run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-TaFhiM12.git
cd artifacta-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=your_backend_api_url
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
artifacta-client/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── pages/           # Page components
│   ├── routes/          # Routing configuration
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .env.example         # Environment variables template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please contact [tafhim000001@gmail.com](mailto:tafhim000001@gmail.com).
