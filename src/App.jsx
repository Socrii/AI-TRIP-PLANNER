import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateTrip from './create-trip/index';
import ViewTrip from './view-trip/index';
import Hero from './components/custom/Hero';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
