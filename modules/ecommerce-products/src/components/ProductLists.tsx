import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard";
import { Product } from "./models/product";
import {ProductSearch} from "./ProductSearch";
import { Loader } from "./Loader";

export function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const [query, setQuery ] = useState({
        category: "",
        title: ""
    })
    useEffect(() => {
        fetechProducts()
    }, [])

    async function fetechProducts() {
        setLoading(true)
        const data  = await  callProducts()
        setProducts(data);
        setLoading(false)
    }

    async function callProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            fetch("https://fakestoreapi.com/products", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(async (response: Response) => {
                if (!response.ok) {
                    reject(response)
                    return;
                }
                return await response.json();
            })
            .then((data) => {   resolve(data as Product[])  })
            .catch((error: any) => reject(error))
        })
    }


    function handleChange  (e: any) {
        setQuery({...query, [e.target.name] : e.target.value })
    }

    return <>
        <ProductSearch query={query} handleChange={handleChange} />
        
        {
            loading ?
                <Loader /> :
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {
                    products.map((product, index) => <ProductCard key={index} index={index} product={product} />)
                }
                </section>
        }
    </>
}