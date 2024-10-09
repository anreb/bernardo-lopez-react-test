import { call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchProductsSuccess,
    fetchProductsFailure,
    createProductSuccess,
    createProductFailure,
    editProductSuccess,
    deleteProductSuccess
} from '../actions/productActions';
import {
    FETCH_PRODUCTS_REQUEST,
    CREATE_PRODUCT_REQUEST,
    EDIT_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST
} from '../types';
import { Product } from '../../types/productTypes';

const fetchProductsAPI = async (): Promise<Product[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const createProductAPI = async (product: Product): Promise<Product> => {
    const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Failed to create product');
    }
    return response.json();
};

function* fetchProducts() {
    try {
        const products = yield call(fetchProductsAPI);
        yield put(fetchProductsSuccess(products));
    } catch (error) {
        yield put(fetchProductsFailure(error.message));
    }
}

function* createProduct(action: any) {
    try {
        const newProduct = yield call(createProductAPI, action.payload);
        yield put(createProductSuccess(newProduct));  // Dispatch success with new product
    } catch (error) {
        yield put(createProductFailure(error.message));
    }
}

// Saga to edit a product in the state
function* editProduct(action: any) {
    try {
        yield put(editProductSuccess(action.payload));  // Directly update the state
    } catch (error) {
        // Handle any errors if necessary (not likely needed since no network requests are involved)
        console.error('Error editing product:', error);
    }
}

// Saga to delete a product from the state
function* deleteProduct(action: any) {
    try {
        yield put(deleteProductSuccess(action.payload));  // Remove the product from the state
    } catch (error) {
        // Handle any errors if necessary
        console.error('Error deleting product:', error);
    }
}

export function* productSaga() {
    yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts);
    yield takeEvery(CREATE_PRODUCT_REQUEST, createProduct);
    yield takeEvery(EDIT_PRODUCT_REQUEST, editProduct);  // Handle product edit
    yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProduct);  // Handle product delete
}


