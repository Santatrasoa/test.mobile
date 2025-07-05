# 📱 Sport Store – React Native Mobile App

A mobile application built with React Native + Expo
featuring:
- Product display
- Product addition
- User profile management
- Custom navigation bar
- Category filtering and search functionality



## ✅ Implemented Features

- 📦 Product list with images, names, and prices
- 🔍 Product search by name
- 🏷️ Category filtering using `DropDownPicker`
- ➕ Add new products via a form (name, price, stock, category, description)
- 👤 User profile management with editing and saving via `AsyncStorage`
- 📱 Custom navigation between Home, Add Product, and Profile screens
- 📸 Default image fallback for invalid URLs
- 🧠 `ProductContext` for global product data management



## 🚀 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/santatrasoa/test.mobile.git
cd test.mobile
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Install Expo CLI (if not already installed)

```bash
npm install -g expo
```



## ▶️ Run the App

```bash
npx expo start
# or
npm start
```

**NB**: An internet connection is required when launching the application to display product images. Without an internet connection, no images will be shown.


Scan the QR code with Expo Go on your Android/iOS device.


## 🧪 Testing the App

- ✅ Tested on mobile via Expo Go
- ✅ Keyboard handling tested on Android (hides `Navbar`)
- ✅ All features tested locally without a backend (data persisted via `AsyncStorage`)
- ❌ Not yet connected to an external database



## 🧱 Project Structure

```
/components
  └── Navbar.tsx          # Custom navigation bar

/context
  └── ProductContext.tsx  # Global product data context

/assets/images
  └── null.png            # Default fallback image

/pages
  ├── Home/welcomePage.tsx    # Home screen with catalog and search
  ├── addProduct/addProducts.tsx  # Product addition form
  └── Profile/profil.tsx         # User profile screen

/app.json
```



## ⚙️ Technical Choices

 Tool/Tech                      Purpose                              
 Expo                           Simplifies React Native development      
 TypeScript (.tsx)              Strong typing for error prevention       
 react-native-dropdown-picker   Dropdown menu for category selection     
 react-navigation / expo-router Screen navigation                       
 AsyncStorage                   Local storage for user profile data      
 KeyboardAvoidingView           Manages keyboard display on mobile       
 FlatList                       Efficient product list rendering         



## 📝 Next Steps

- Integrate Firebase or a backend for product and user data storage
- Implement secure authentication
- Enable product image uploads
- Add unit tests