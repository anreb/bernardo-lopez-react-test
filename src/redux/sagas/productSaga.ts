// src/sagas/productSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchProductsSuccess,
    fetchProductsFailure,
} from '../actions/productActions';
import { FETCH_PRODUCTS_REQUEST, } from '../types';
import { Product } from '../../types/productTypes';

const fetchProductsAPI = async (): Promise<Product[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
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

export function* productSaga() {
    yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts);
}
