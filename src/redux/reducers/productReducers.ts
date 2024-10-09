import { Product } from '../../types/productTypes';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    ProductState,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT
} from '../types';

const initialState: ProductState = {
    loading: false,
    products: [],
    localProducts: [],
    error: '',
    currentPage: 1,
    totalPages: 0,
    filteredProducts: [],
};

const productReducer = (state = initialState, action: any): ProductState => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_PRODUCTS_SUCCESS:
            {
                const mergedProducts = [...action.payload, ...state.localProducts];
                return {
                    ...state,
                    loading: false,
                    products: mergedProducts,
                    error: '',
                    totalPages: Math.ceil(mergedProducts.length / 5), // Adjust for your pagination
                    filteredProducts: mergedProducts,
                };
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload,
                filteredProducts: [],
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'FILTER_PRODUCTS':
            return {
                ...state,
                filteredProducts: action.payload,
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
                filteredProducts: [...state.filteredProducts, action.payload]
            };
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case CREATE_PRODUCT_SUCCESS:
            {
                const newLocalProducts = [...state.localProducts, action.payload]; // Add to localProducts
                const updatedProducts = [...state.products, action.payload];
                return {
                    ...state,
                    loading: false,
                    products: updatedProducts,
                    filteredProducts: updatedProducts, // Update filtered products too
                    localProducts: newLocalProducts,  // Keep track of locally added products
                    totalPages: Math.ceil(updatedProducts.length / 2), // Update pagination
                };
            }
        case CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map((product: Product) =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product: Product) => product.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default productReducer;


