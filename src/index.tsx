import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Crée ton store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Typage de l'état global et du dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Fournir le store à l'application
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <SpeedInsights />
      <App />
    </StrictMode>
  </Provider>
);
