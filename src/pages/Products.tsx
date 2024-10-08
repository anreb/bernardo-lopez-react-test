import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../redux/actions/productActions';
import { ProductState } from '../redux/types';

const Products = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state: { products: ProductState }) => state.products);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;

