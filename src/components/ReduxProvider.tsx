// components/ReduxProvider.tsx
"use client";

import { Provider } from 'react-redux';
import store from '../store';
import AppInitializer from '../store/slices/AppInitializer'; // Ensure this import path is correct

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AppInitializer />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
