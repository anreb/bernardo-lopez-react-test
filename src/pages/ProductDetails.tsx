import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product } from '../types/productTypes';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product: Product | undefined = useSelector((state: any) =>
        state.products.filteredProducts.find((p: Product) => p.id === Number(id))
    );

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.title} />
        </div>
    );
};

export default ProductDetails;







