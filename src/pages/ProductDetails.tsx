import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return <h1>Product Details for ID: {id}</h1>;
};

export default ProductDetails;