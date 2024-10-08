import { all } from 'redux-saga/effects';
import { productSaga } from './productSaga';

export function* rootSaga() {
    yield all([productSaga()]);
}