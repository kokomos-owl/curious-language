import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FirstObservation from './components/FirstObservation';
import HabitatPage from './pages/HabitatPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstObservation />} />
      <Route path="/habitat" element={<HabitatPage />} />
    </Routes>
  );
}
