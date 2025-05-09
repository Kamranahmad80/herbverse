# HerbVerse - Hackathon Demo App

A React Native + Expo mobile application for showcasing and exploring natural wellness products. This app was built for a hackathon to demonstrate a marketplace for herbal and wellness products with a dual-interface for both customers and vendors.

## App Screenshots

<p align="center">
  <img src="./data/assets/localhost_8081_(iPhone 12 Pro).png" alt="HerbVerse User Interface" width="350" />
  <img src="./data/assets/localhost_8081_(iPhone 14 Pro Max) (2).png" alt="HerbVerse Vendor Interface" width="350" />
</p>

## 🌿 Features

### For Customers
- **Authentication**: Secure user registration and login using Firebase Auth
- **Product Discovery**: Browse a curated collection of herbs and wellness products
- **Shopping Cart**: Add items to cart with real-time badge updates and quantity management
- **User Profiles**: Update personal information and add profile images
- **Shipping Addresses**: Add and manage multiple shipping addresses
- **Payment Methods**: Securely store payment information
- **Order History**: View past orders and track current orders

### For Vendors
- **Product Management**: Add, edit, and remove products from inventory
- **Order Dashboard**: View and manage incoming orders
- **Sales Analytics**: Basic insights into product performance
- **Profile Management**: Customize vendor profile and store information

## 🚀 Tech Stack

- **React Native (v0.79.1)**: Core framework for cross-platform mobile development
- **Expo SDK (v53.0.0)**: Development platform and toolchain
- **Expo Router (v5.0.2)**: File-based routing system
- **Firebase v11.6.1**:
  - Firebase Authentication: User authentication and management
  - Firestore: NoSQL database for users, products, and orders
  - Firebase Storage: For storing product images and user uploads
- **UI Components**:
  - Expo Vector Icons
  - Expo Blur and Linear Gradient for visual effects
  - Lucide React Native for icon set
- **Local Storage**: AsyncStorage for client-side data persistence
- **Image Handling**: Expo Image Picker for uploading profile and product images
- **State Management**: React Context API for auth and cart states
- **Navigation**: React Navigation (Bottom Tabs) for tab-based navigation
- **TypeScript**: For type safety and better developer experience

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Git** for version control
- **Expo CLI** installed globally (`npm install -g expo-cli`)
- **Firebase account** (for backend services)
- **Expo Go app** on your mobile device for testing (or an emulator/simulator)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kamranahmad80/herbverse.git
   cd herbverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password) and Firestore
   - Create a web app in your Firebase project
   - Copy the configuration to `firebaseConfig.js` in the project root

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Or
   ```bash
   npx expo start
   ```

5. **Running on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Alternatively, press 'a' for Android emulator or 'i' for iOS simulator

## 📱 Building for Production

### Web
```bash
npm run build:web
```

### Native (iOS/Android)
Follow the [Expo EAS Build instructions](https://docs.expo.dev/build/introduction/)

## 📁 Project Structure

```
├── app/                    # Main application routes using Expo Router
│   ├── (tabs)/             # Customer-facing tabs and screens
│   ├── (vendor-tabs)/      # Vendor-facing tabs and screens
│   ├── auth/               # Authentication screens
│   └── [product]/          # Dynamic product detail pages
├── assets/                 # Static assets (images, fonts)
├── components/             # Reusable UI components
│   ├── buttons/            # Button components
│   ├── cards/              # Card components
│   ├── forms/              # Form inputs and controls
│   └── layout/             # Layout components
├── constants/              # App constants
│   ├── Colors.ts          # Color definitions
│   └── Layout.ts          # Layout constants
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication state management
│   └── CartContext.tsx     # Shopping cart state management
├── data/                   # Mock data and data utilities
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   ├── useCart.ts          # Shopping cart hook
│   ├── useProducts.ts      # Product data hook
│   └── useOrders.ts        # Order management hook
├── types/                  # TypeScript type definitions
├── firebaseConfig.js       # Firebase configuration
├── app.json               # Expo configuration
└── package.json           # Dependencies and scripts
```

## 🧪 Testing

Testing guidelines will be added in future iterations of this project.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- Integration with payment gateways
- Push notifications for order updates
- User reviews and ratings
- Advanced search and filtering
- Localization support
- Integration with shipping APIs
- Vendor verification system
- Progressive Web App (PWA) support

## 📧 Contact

For questions or feedback about this project, please reach out to:
- Project Team - [kamranahmadkhan1981@gmail.com](mailto:kamranahmadkhan1981@gmail.com)

---

*This project was created as part of a hackathon demonstration and is not intended for production use without further development and security auditing.*
