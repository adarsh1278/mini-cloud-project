# Mini Cloud - Cloud File Manager

![Mini Cloud Logo](/public/cloud_icon.png)

A modern, responsive web application for storing, managing, and organizing files in the cloud. Built with Next.js, Firebase, and tailored with a clean, user-friendly interface.

## Features

- **File Management**: Upload, view, download, and delete files
- **Folder Structure**: Create folders and organize files inside them
- **User Authentication**: Google OAuth login via NextAuth
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Storage Dashboard**: Track storage usage and limits
- **File Filtering**: Sort and filter files by type, date, and size
- **Trash Functionality**: Recover or permanently delete files from trash
- **Dark/Light Mode**: Auto-detects system preference with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18
- **Styling**: Tailwind CSS, DaisyUI
- **Backend**: Firebase (Firestore & Storage)
- **Authentication**: NextAuth with Google Provider
- **File Handling**: Firebase Storage
- **Database**: Firestore Database
- **Hosting**: Vercel (recommended)

## Screenshots

![Dashboard](/public/home_ss.png)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Firebase account
- Google Cloud account (for Google OAuth)

### Environment Variables

Create a `.env` file in the root directory with the following:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=random_string_for_encryption
NEXTAUTH_URL=http://localhost:3000
FIREBASE_API_KEY=your_firebase_api_key
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adarsh1278/mini-cloud.git
   cd mini-cloud
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Firebase Setup

1. Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Storage
4. Create a Web App and copy configuration
5. Update Firebase config in `src/config/Firebase.js`
6. Set up security rules for Firestore and Storage

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes
│   │   ├── auth/        # Auth pages
│   │   ├── folder/      # Folder view pages
│   │   ├── myfiles/     # My files page
│   │   └── trash/       # Trash page
│   ├── assets/          # Project assets
│   ├── components/      # React components
│   │   ├── common/      # Common components
│   │   ├── file/        # File-related components
│   │   ├── folder/      # Folder-related components
│   │   └── storage/     # Storage-related components
│   ├── config/          # Configuration files
│   ├── context/         # React context providers
│   ├── data/            # Static data
│   └── services/        # API service functions
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

## Author

**Adarsh Tiwari** - [GitHub](https://github.com/adarsh1278) - Web Developer

---

Made with ❤️ by Adarsh Tiwari