import { DashboardLayout } from "@/layouts/file-grid-layout";
import { FileGridLayout } from "@/layouts/folder-id-layout";
import { Route, Routes } from "react-router";
function App() {
  return (
    <Routes>
      <Route path="/*" element={<DashboardLayout />}>
        <Route path="*" element={<FileGridLayout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
