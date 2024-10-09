import { Product } from '../types/productTypes';

export interface ProductState {
    loading: boolean;
    products: Product[];
    error: string;
    currentPage: number;
    totalPages: number;
    filteredProducts: Product[];
}

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';