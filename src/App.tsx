import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecordStore } from './store/useRecordStore';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';

export default function App() {
  const load = useRecordStore((s) => s._load);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
