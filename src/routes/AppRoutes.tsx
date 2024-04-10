import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { Home } from "../components/Home";
import { NotFound } from "../components/NotFound";
import React from "react";
const RemoteProductApp = React.lazy(() => import("product/ProductApp"));
const RemoteOrderApp = React.lazy(() => import("order/OrderApp"));
const AppRoutes = () => {
    const [loading, setLoading] = useState(false);
    return <div>
        <Header />
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Home loading={loading} setLoading={setLoading} />} />
                <Route  path="/products/*" element={<RemoteProductApp />}/>
                <Route  path="/orders/*" element={<RemoteOrderApp />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </div>
};
export default AppRoutes;
