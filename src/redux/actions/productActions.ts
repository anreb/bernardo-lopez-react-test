import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    ADD_PRODUCT,
    EDIT_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    EDIT_PRODUCT,
    DELETE_PRODUCT
} from '../types';
import { Product } from '../../types/productTypes';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: Product[]) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error: string) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

export const addProduct = (product: Product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

export const createProductRequest = (product: Product) => ({
    type: CREATE_PRODUCT_REQUEST,
    payload: product,
});

export const createProductSuccess = (product: Product) => ({
    type: CREATE_PRODUCT_SUCCESS,
    payload: product,
});

export const createProductFailure = (error: string) => ({
    type: CREATE_PRODUCT_FAILURE,
    payload: error,
});

export const editProductRequest = (product: Product) => ({
    type: EDIT_PRODUCT_REQUEST,
    payload: product,
});

export const editProductSuccess = (product: Product) => ({
    type: EDIT_PRODUCT,
    payload: product,
});

export const deleteProductRequest = (id: Product["id"]) => ({
    type: DELETE_PRODUCT_REQUEST,
    payload: id,
});

export const deleteProductSuccess = (id: Product["id"]) => ({
    type: DELETE_PRODUCT,
    payload: id,
});

