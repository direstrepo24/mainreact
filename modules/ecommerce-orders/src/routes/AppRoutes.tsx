import { Route, Routes } from "react-router-dom";
import { OrderList } from "../components/OrdersList";

const AppRoutes = () => {
    return <div className="border-4  border-green-700">
    <Routes>
       <Route path="/" element={<OrderList />}/> 
     </Routes>
    </div>
  
 };
export default AppRoutes;