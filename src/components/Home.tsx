import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

interface HomeProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function Home({
    loading,
    setLoading
}: HomeProps) {

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        if (!products.length) {
            fetechProducts()
        }
    }, [products])

    async function fetechProducts() {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setLoading(false)
    }

    async function getProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            fetch("https://fakestoreapi.com/products?limit=3", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async (response: Response) => {
                    if (!response.ok) {
                        reject(response)
                        return;
                    }
                    return await response.json();
                })
                .then((data) => { resolve(data as Product[]) })
                .catch((error: any) => reject(error))
        })
    }


    return loading ? <Loader /> : <div className="mx-auto container flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0">
            <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
                <div>
                    <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">International Ecommerce, We Are Here</p>
                </div>
                <div className="mt-4 lg:w-4/5 xl:w-3/5">
                    <p className="text-base leading-6 text-gray-600">Same tech for less
                        Save by shopping on Shop.</p>
                </div>
                <div className="mt-16 w-full">
                    <Link to="/products">
                        <button className="px-4 bg-green-400 rounded-md flex justify-between items-center w-full lg:w-72 h-14 text-white focus:ring-2 outline-none  focus:ring-offset-2">
                            <p className="text-xl font-medium leading-5 bg-green-400 py-3 px-5 text-white rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">See More</p>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66663 16H25.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 21.3333L25.3333 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 10.6667L25.3333 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                <div className="">
                    {products.length > 0 && (
                        <>
                            <img className="hidden lg:block" width="500" src={products[0].image} alt={products[0].title} />
                            <img className="w-80 sm:w-auto lg:hidden" src={products[0].image} alt={products[0].title} />
                        </>
                    )}
                </div>
                <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-0 sm:space-y-5 lg:space-y-5 xl:space-y-8">
                    {
                        products.slice(1, 3).map((product, index) => (
                            <div key={index}>
                                <img className="hidden lg:block" width="300" src={product.image} alt={product.title} />
                                <img className="w-80 sm:w-auto lg:hidden" src={product.image} alt={product.title} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
}


export interface Product {
    image: string;
    category: string;
    title: string;
    price: number;
}