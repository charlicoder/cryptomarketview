
# CryptoMarketView

CryptoMarketView is a Next.js application for viewing cryptocurrency market data. This README provides instructions for setting up and running the app locally or using Docker.

---

## Features
- Real-time cryptocurrency market tracking
- Responsive and modern UI
- Docker-ready for containerized deployment

---

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Docker (optional, if using containerized deployment)

---

## Getting Started

Follow these steps to get the project up and running locally or via Docker.

### 1. Clone the repository
```bash
git clone git@github.com:charlicoder/cryptomarketview.git
cd cryptomarketview
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

#### Option 1: Run locally

```bash
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000).

#### Option 2: Run using Docker

```bash
bash deploy.sh
```

This script will build the Docker image and start the container.

---

## Project Structure

```
cryptomarketview/
├─ components/      # Reusable UI components
├─ pages/           # Next.js pages
├─ public/          # Static assets
├─ styles/          # CSS/SCSS files
├─ deploy.sh        # Docker deployment script
├─ package.json     # Project dependencies and scripts
└─ README.md
```

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License.
