# Smart Rubbish Classifier

An AI-powered waste management system that automates waste sorting while incentivizing proper disposal behavior through gamification.

## Project Structure

```
├── backend-api/          # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/  # API route controllers
│   │   ├── services/     # Business logic services
│   │   ├── models/       # Database models
│   │   └── middleware/   # Express middleware
│   ├── Dockerfile
│   └── package.json
├── edge-service/         # Edge computing service for smart bins
│   ├── src/
│   │   ├── services/     # Hardware interface services
│   │   ├── ml/          # Machine learning models
│   │   └── hardware/    # Hardware abstraction layer
│   ├── Dockerfile
│   └── package.json
├── mobile-app/          # React Native mobile application
│   ├── src/
│   │   ├── screens/     # App screens/pages
│   │   ├── components/  # Reusable UI components
│   │   ├── services/    # API client services
│   │   └── store/       # Redux store configuration
│   └── package.json
├── shared/              # Shared TypeScript types and interfaces
│   └── types/
│       ├── models.ts    # Data model interfaces
│       └── api.ts       # API contract interfaces
└── docker-compose.yml   # Development environment setup
```

## Development Setup

1. **Prerequisites**
   - Node.js 18+
   - Docker and Docker Compose
   - Git

2. **Start Development Environment**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd smart-rubbish-classifier

   # Install dependencies for all services
   cd backend-api && npm install
   cd ../edge-service && npm install
   cd ../mobile-app && npm install
   cd ..

   # Build all services
   cd backend-api && npm run build
   cd ../edge-service && npm run build
   cd ..

   # Start all services with Docker Compose
   docker-compose up -d

   # Or run individual services locally:
   # Backend API: cd backend-api && npm run dev
   # Edge Service: cd edge-service && npm run dev  
   # Mobile App: cd mobile-app && npm start
   ```

3. **Service URLs**
   - Backend API: http://localhost:3000
   - Edge Service: http://localhost:3001
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

## Architecture Overview

The system consists of three main components:

- **Edge Service**: Runs on smart bins, handles camera capture, ML classification, weight measurement, and QR scanning
- **Backend API**: Central server managing member accounts, points, rewards, and analytics
- **Mobile App**: Member interface for account management, QR code display, and reward redemption

## Technology Stack

- **Backend**: Node.js, Express.js, PostgreSQL, Redis
- **Edge Computing**: Node.js, OpenCV, PyTorch/TensorRT
- **Mobile**: React Native, Redux Toolkit
- **Infrastructure**: Docker, Docker Compose

## Next Steps

This is the initial project structure. Refer to the implementation tasks in `.kiro/specs/smart-rubbish-classifier/tasks.md` for detailed development steps.