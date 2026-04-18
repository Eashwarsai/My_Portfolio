import { Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";

export default function BlogRoutes() {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path=":slug" element={<BlogDetail />} />
    </Routes>
  );
}
