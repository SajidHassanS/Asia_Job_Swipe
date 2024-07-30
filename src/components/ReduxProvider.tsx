// components/ReduxProvider.tsx
"use client";

import { Provider } from 'react-redux';
import store from '../store';
import AppInitializer from '../store/slices/AppInitializer'; // Ensure this import path is correct
// import SocketListener from '@/components/SocketListener'; 
import MessageListener from '@/services/MessageListener';
import Socket from '@/services/socket';
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      
      <AppInitializer />
      {/* <Socket/>
      <MessageListener/> */}
      {children}
    </Provider>
  );
};

export default ReduxProvider;
