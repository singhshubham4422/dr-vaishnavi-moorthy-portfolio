# Academic Portfolio - Dr. Vaishnavi Moorthy

A professional, responsive, and accessible academic portfolio website built with **React** and **Vite**. This project allows professors and researchers to showcase their bibliography, research interests, teaching history, and lab activities in a modern, production-grade web application.

## 🚀 Features

- **Premium Design**: "Academic Deep Navy & Gold" theme with glassmorphism effects and smooth transitions.
- **Typography**: Uses **Playfair Display** for headings and **Inter** for body text for optimal readability and academic elegance.
- **Dynamic Content**: Data is separated from UI components (stored in `src/data`), making updates easy without touching React code.
- **SEO Friendly**: Uses `react-helmet` to manage document heads for better search engine visibility.
- **Responsive**: Fully optimized for mobile, tablet, and desktop viewing.
- **Interactive**: Hover effects, timeline visualizations, and dynamic navigation.
- **Fast Performance**: Built on Vite for lightning-fast HMR and production builds.

## 🛠️ Tech Stack

- **Frontend Library**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Vanilla CSS with CSS Variables (Design Tokens)
- **Metadata**: React Helmet

## 📂 Project Structure

```bash
src/
├── assets/          # Images and static files
├── components/      # Reusable UI components (Navbar, Footer)
├── data/            # JSON/JS data files (Update content here!)
│   ├── aboutData.js
│   ├── homeData.js
│   ├── newsData.js
│   ├── profile.js
│   ├── projectsData.js
│   ├── publicationsData.js
│   ├── researchData.js
│   ├── studentsData.js
│   ├── talksData.js
│   └── teachingData.js
├── pages/           # Page components (Home, About, Research, etc.)
├── styles/          # Global styles (if separated)
├── App.jsx          # Main application component
├── index.css        # Global CSS, Variables, and Typography
└── main.jsx         # Entry point
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1.  **Clone the repository** (or unzip the project folder):
    ```bash
    git clone <repository-url>
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The app will start at `http://localhost:5173`.

### Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be deployed to Netlify, Vercel, or GitHub Pages.

## 📝 How to Update Content

You do not need to edit the React components to change most content. All text and data are stored in `src/data/`.

- **Personal Details**: Edit `src/data/profile.js`
- **Bio & History**: Edit `src/data/aboutData.js`
- **Research Interests**: Edit `src/data/researchData.js`
- **Publications**: Edit `src/data/publicationsData.js`
- **Projects**: Edit `src/data/projectsData.js`
- **News**: Edit `src/data/newsData.js`
- **Talks & Service**: Edit `src/data/talksData.js`
- **Students**: Edit `src/data/studentsData.js`
- **Courses**: Edit `src/data/teachingData.js`

### Changing the Profile Image
1.  Place your new image in `src/assets/`.
2.  Open `src/data/homeData.js`.
3.  Import the new image and assign it:
    ```javascript
    import myNewImage from '../assets/new-photo.jpg';
    // ...
    image: myNewImage,
    ```

## 📧 Contact Form

The contact form is currently set to **simulation mode**. To make it functional:
1.  Register at [Formspree](https://formspree.io/) or [EmailJS](https://www.emailjs.com/).
2.  Update the `handleSubmit` function in `src/pages/Contact.jsx` with your service's API logic.

## 📄 License

This project is open-source and available for customized academic use.
