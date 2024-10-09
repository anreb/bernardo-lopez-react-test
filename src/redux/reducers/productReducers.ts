import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ProductState
} from '../types';
// import { Product } from '../../types/productTypes';

const initialState: ProductState = {
    loading: false,
    products: [],
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
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: '',
                totalPages: Math.ceil(action.payload.length / 5), // Adjust for your pagination
                filteredProducts: action.payload,
            };
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
        default:
            return state;
    }
};

export default productReducer;


