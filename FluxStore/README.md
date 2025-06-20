# React Native Practice

## Overview

- This document provides the plan, requirements and estimation for React Native Practice.
- Build FluxStore app

## Target

- Config splash screen
- Home screen show list 1000 item => flatlist, optimize, load more
- Optimize image
- Apply [Linking](https://reactnative.dev/docs/linking)
- Push Notifications using[ Firebase Cloud Messaging](https://rnfirebase.io/dynamic-links/usage)
- Apply [Firebase Performance Monitoring](https://rnfirebase.io/perf/usage) and [Crashlytics](https://rnfirebase.io/crashlytics/usage)
- Simple animation, Gesture hander, and responsive layout (Support Tablet)
- Optimize application performance
  - [Create a Google Sheet](https://docs.google.com/spreadsheets/d/1I8HYj4GX7PuN-oxPKb_iHuYdpjK86jlgAa_yLpVLwok/edit?gid=0#gid=0) to log current application performance
  - Add the result after the optimized performance for comparison

## Technical Stack

- React ([v19](https://react.dev/versions#react-19))
- React Native ([v0.79.1](https://reactnative.dev/blog/2025/04/08/react-native-0.79))
- React Navigation ([v7.1.6](https://reactnavigation.org/docs/getting-started/))
- Zustand ([v5.0.3](https://zustand.docs.pmnd.rs/getting-started/introduction))
- React Query ([v5.74.4](https://tanstack.com/query/v5/docs/framework/react/overview))
- Jest ([v29.6.3](https://jestjs.io/docs/29.6/expect))
- Testing-library/react-native ([v13.2.0](https://callstack.github.io/react-native-testing-library/docs/start/quick-start))

## Prerequisites

Ensure sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) instructions till "Creating a new application" step, before proceeding.

- **Notes**: If you previously installed a global react-native-cli package, please remove it as it may cause unexpected issues.
  ```bash
  npm uninstall -g react-native-cli @react-native-community/cli
  ```

## Installation

1. **Clone the repository:**
   ```bash
   git clone -b feature/flux-store git@gitlab.asoft-python.com:tien.nguyen/react-native-training.git
   ```
2. **Move to folder:**
   ```bash
   cd react-native-training/FluxStore
   ```
3. **Install dependencies:**

   ```bash
   yarn install
   ```

   **Additional step for iOS**

   ```bash
   npx pod-install
   ```

   - If you are having trouble with iOS, try to reinstall the dependencies by running:

     1. `cd ios` to navigate to the `ios` folder.

     2. `bundle install` to install **Bundler**
     3. `bundle exec pod install` to install the iOS dependencies managed by CocoaPods.

4. **Run the application:**

   ```bash
   yarn android
   # or
   yarn ios
   ```

## Features

- **Linting & Formatting:** ESLint and Prettier for code quality.
- **Testing:** Setup with Jest and React Native Testing Library.
- **Storybook:** Storybook configured.

- Users can see Welcome screen
- Users can login
- Users can see home page
- Users can horizontal scrolling feature products and recommended sections.
- Users can see list products (search, filter)
- Users can see product details
  - See information product
  - Swipe effect for image
  - Choice color, size for add to cart
- Users can add a product to card, checkout, order

## Folder Structure

```
FluxStore
├── .storybook             # Storybook configuration
├── android                # Android-specific files
├── ios                    # iOS-specific files
├── src
│   ├── assets         # Assets (images, fonts, etc.)
│   ├── components         # Reusable components with unit tests and storybook
│   ├── configs            # Configuration files for various services and settings
│   ├── constants          # Constant values used throughout the app
│   ├── hooks              # Custom hooks
│   ├── interfaces         # TypeScript interfaces and types
│   ├── navigation         # Navigation configuration
│   ├── screens            # Screen components
│   ├── services           # API services
│   └── utils              # Utility functions
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── app.json               # App configuration
├── App.tsx                # Main App component
├── babel.config.js        # Babel configuration
├── index.js               # App entry point
├── jest-setup.ts          # Jest additional setup
├── jest.config.js         # Jest configuration
├── metro.config.js        # Metro configuration
├── package.json           # Project dependencies
├── react-native.config.js # Custom configuration for React Native CLI
├── test-utils             # Setup custom render for testing library
└── tsconfig.json          # TypeScript configuration file
```

## Usage

### Running on Android

```bash
yarn android
```

### Running on iOS

```bash
yarn ios
```

To run on specific simulator

```bash
yarn ios --simulator "iPhone 15 Pro"
```

### Open Storybook

- Open the Developer Menu: Once your app is running on the simulator or device, open the developer menu with following commands or shake on real device.
  - iOS: Press `Cmd` + `D`
  - Android: Press `Cmd` + `M` or `Ctrl` + `M`
- Select `Toggle Storybook`

### Unit test

```bash
yarn test 
```

### Environment

- Create an `.env` file in the root directory with environment values.

**Notes**: 
- Run `npx pod-install` every when add/update new environment values to let iOS update the latest values.
- Before running npm start: create .env.local with .env.template (contact to me to get information of environment variable - Email: tien.nguyen@asnet.com.vn - Slack: tien.nguyen)
