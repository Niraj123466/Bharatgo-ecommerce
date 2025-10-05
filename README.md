# E-Commerce React App

A modern e-commerce application built with React, Redux Toolkit, and Vite. This project implements a complete online shopping experience with user authentication, product browsing, cart management, and order tracking.

## 🚀 Features

### Core Functionality
- **User Authentication**: Login and signup with JWT token-based authentication
- **Product Browsing**: Browse products by categories with dynamic filtering
- **Product Details**: Click on products to view detailed information
- **Shopping Cart**: Add/remove items, update quantities, and manage cart state
- **Order Management**: Complete checkout process and track order history
- **Search & Filtering**: Search products by name, sort by price/name, filter by price range

### Technical Features
- **Responsive Design**: Mobile-first approach with responsive layouts
- **State Management**: Redux Toolkit for global state management
- **API Integration**: Integrated with Platzi Fake Store API
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Dynamic cart updates and product filtering

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS, Custom SCSS
- **Icons**: Heroicons
- **API**: Platzi Fake Store API (https://api.escuelajs.co/api/v1/)
- **Build Tool**: Vite
- **UI Components**: Custom design system with Tailwind

## 📦 Installation

### Option 1: Standard Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

### Option 2: Using Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-main
   ```

2. **Build and run with Docker**
   ```bash
   # Build and start the container
   docker compose up -d
   ```

3. **Access the application**
   - Open your browser and navigate to http://localhost:8080

4. **Stop the container**
   ```bash
   docker compose down
   ```

> Note: Make sure you have Docker installed on your system. If you're using an older version of Docker, you might need to use `docker-compose` (with hyphen) instead of `docker compose` (with space).

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Modal/          # Cart and product detail modals
│   └── Navbar/         # Navigation component
├── pages/              # Page components
│   ├── Home/           # Main layout with navbar
│   ├── Category/       # Product listing page
│   ├── Order/          # Order history page
│   ├── OrderDetails/   # Individual order details
│   ├── Account/        # User account page
│   └── UserAuth/       # Login and signup pages
├── services/           # API service functions
│   ├── auth.js         # Authentication API calls
│   └── product.js      # Product API calls
├── store/              # Redux store configuration
│   └── slices/         # Redux slices for different features
└── App.jsx            # Main application component
```

## 🎯 Key Features Implementation

### Authentication
- JWT-based authentication using Platzi Fake Store API
- Protected routes and user session management
- Login/signup forms with validation

### Product Management
- Dynamic product loading from API
- Category-based filtering
- Search functionality with real-time results
- Product detail views with modal popups

### Shopping Cart
- Add/remove products from cart
- Quantity management
- Persistent cart state
- Checkout process with order creation

### Order Management
- Order history tracking
- Detailed order views
- Order status management

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 UI/UX Features

- **Modern Design System**: Custom color palette, typography, and component library
- **Tailwind CSS**: Utility-first styling with custom components and animations
- **Smooth Animations**: Stagger animations, hover effects, and micro-interactions
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton loaders and smooth transitions
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Gradient Elements**: Beautiful gradient backgrounds and text effects

## 🔐 API Integration

The app integrates with the Platzi Fake Store API:
- **Base URL**: `https://api.escuelajs.co/api/v1/`
- **Endpoints Used**:
  - `/products` - Fetch all products
  - `/products/?categoryId={id}` - Fetch products by category
  - `/categories` - Fetch product categories
  - `/auth/login` - User authentication
  - `/auth/profile` - User profile data
  - `/users/` - User registration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is part of a frontend development assignment and is for educational purposes.

## 🐛 Known Issues

- Product images may take time to load due to external API
- Cart state is not persisted across browser sessions
- No real payment processing (mock checkout only)

## 🔮 Future Enhancements

- User profile management
- Product reviews and ratings
- Wishlist functionality
- Advanced filtering options
- Real payment integration
- Admin dashboard
- Product recommendations