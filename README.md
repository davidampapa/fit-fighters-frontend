# Fit Fighters Frontend

Welcome to the **Fit Fighters Frontend** project! This is the frontend interface for the Fit Fighters management platform.

It complements the backend system that manages fighters and matches. This frontend offers a user-friendly view of fighters, upcoming fights, and event details.

### ⚠️ Project Status

This project is **currently under active development** and not yet fully functional.

- The **backend** is complete and fully operational.
- The **frontend** is still being developed — some features are incomplete or missing:
  - The **"Places" page is not implemented yet**.
  - Minor UI bugs may be present.

> Functionality is missing **only on the frontend side**. The backend API is fully functional and ready for use.
---

## ✨ Features

- View list of fighters and their stats
- Browse scheduled and past fights
- Responsive UI compatible with both desktop and mobile
- Simple integration with backend REST API

---

## 🛠️ Tech Stack

- **Framework:** React
- **Styling:** CSS / SCSS
- **API Communication:** Fetch API / Axios
- **Deployment-ready:** Dockerized build

---

## 🚀 Getting Started (Development)

1. **Clone the main repository:**

```bash
git clone https://github.com/davidampapa/fit-fighters-frontend.git
cd fit-fighters-frontend
```

```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

> The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🐳 Dockerized Deployment

When running via Docker:

```bash
docker build -t fit-fighters-frontend ./fit-fighters-frontend
docker run -p 3000:80 fit-fighters-frontend
```

Frontend will be accessible at:

```
http://localhost:3000
```

---

## 🗂️ Project Structure

```
fit-fighters-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/    # API requests
│   ├── assets/
│   └── App.jsx
├── Dockerfile
└── package.json
```

---

## 📬 Contact

For any questions or issues, open an issue on GitHub or contact the maintainers.
