import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Product } from '../types/productTypes';
import "./ProductDetails.modules.scss"

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product: Product | undefined = useSelector((state: any) =>
        state.products.filteredProducts.find((p: Product) => p.id === Number(id))
    );

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="productContainer">
            <h1 className="productTitle">{product.title}</h1>
            <p className="productDescription">{product.description}</p>
            <p className="productPrice">Price: ${typeof product.price === 'string' ? product.price : product.price.toFixed(2)}</p>
            {product.rating && (
                <p className="productRating">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                </p>
            )}
            <img className="productImage" src={product.image} alt={product.title} width={300} />
        </div>
    );
};

export default ProductDetails;







