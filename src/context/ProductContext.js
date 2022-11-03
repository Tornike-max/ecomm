import { createContext , useState} from "react";
import useAxios from "../app/hooks/useAxios";
import { instance } from "../app/instance";

export const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
    const { data: mainPageProducts, loading: mainPageLoading, getData } = useAxios('/products')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const saveProduct = async(product) => {
        const endpoint = selectedProduct ? `/products/${selectedProduct._id}` : "/products"
        const method = selectedProduct ? "put" : "post"
        try {
            const resp = await instance[method](endpoint, { product })
            setSelectedProduct(null)
        } catch (error) {
            
        }
        
    }
    return  (
        <ProductContext.Provider value={{ mainPageLoading, mainPageProducts, getData, saveProduct, selectedProduct,setSelectedProduct}}>
            {children}
        </ProductContext.Provider>
    )
}
