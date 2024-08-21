import { Route, Routes } from "react-router-dom";
import { ProductList } from "../components/ProductLists";

const AppRoutes = () => {
    return <div className="border-4 border-red-700">
    <Routes>
       <Route path="/" element={<ProductList />}/> 
     </Routes>
    </div>
  
 };
export default AppRoutes;