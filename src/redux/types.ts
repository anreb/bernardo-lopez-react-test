import { Product } from '../types/productTypes';

export interface ProductState {
    loading: boolean;
    products: Product[];
    error: string;
    currentPage: number;
    totalPages: number;
    filteredProducts: Product[];
    localProducts: Product[];
}

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';