import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import ResumeUpload from "./pages/ResumeUpload";
import Services from "./pages/Services.tsx";

const App = () => (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<ResumeUpload />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </BrowserRouter>
);

export default App;