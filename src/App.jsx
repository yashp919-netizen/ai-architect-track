import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Phase from './pages/Phase';
import Lesson from './pages/Lesson';
import Notes from './pages/Notes';
import Playground from './pages/Playground';
import Mosaic from './pages/Mosaic';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Phase /></Layout>} path="/phase/:id" />
        <Route element={<Layout><Lesson /></Layout>} path="/phase/:phaseId/lesson/:lessonId" />
        <Route element={<Layout><Mosaic /></Layout>} path="/mosaic" />
        <Route element={<Layout><Notes /></Layout>} path="/notes" />
        <Route element={<Layout><Playground /></Layout>} path="/playground" />
      </Routes>
    </BrowserRouter>
  );
}
