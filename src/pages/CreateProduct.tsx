import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../redux/actions/productActions';
import { Product } from '../types/productTypes'; // Assuming Product and Rating interfaces are defined here
import { createProductRequest, editProductRequest, deleteProductRequest } from '../redux/actions/productActions'; // Replace with your actual action
import "./CreateProduct.modules.scss";

const errorMessages = {
    invalidTitle: 'Title must not be empty',
    invalidPrice: 'Price must be a positive number',
    invalidDescription: 'Description must not be empty',
    invalidImageUrl: 'Image URL must not be empty',
    invalidCategory: 'Category must not be empty',
    invalidRate: 'Rate must not be empty',
    invalidCount: 'Count must not be empty',
};

const CreateProduct: React.FC = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState<Product>({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: { rate: '', count: '' },
    });
    const [newProduct, setNewProduct] = useState<Product>({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: { rate: '', count: '' },
    });
    const resetProduct = {
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
    };
    const [edit, setEdit] = useState(false);
    const { products } = useSelector((state: any) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductsRequest());
        }
    }, [dispatch]);

    useEffect(() => {
        if (products) {
            const newProduct = products.find(el => el.id === 21)
            setNewProduct(newProduct)
        }
    }, [products])

    const canSubmit =
        !(product.title &&
            Number(product.price) > 0 &&
            product.description &&
            product.category &&
            product.image);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

        if (button.name === 'create') {
            submitCreateProduct();
        } else if (button.name === 'edit') {
            submitEditNewProduct();
        }
    };

    const submitCreateProduct = () => {
        const payload = {
            ...product,
            price: Number(product.price)
        }
        localStorage.setItem('productImgUrl', payload.image)
        dispatch(createProductRequest(payload));
        setProduct(resetProduct)
    }

    const editNewProduct = () => {
        setEdit(true)
        setProduct(newProduct)
    }

    const submitEditNewProduct = () => {
        dispatch(editProductRequest(product));
        setProduct(resetProduct);
        setEdit(false);
    }

    const submitDeleteNewProduct = () => {
        dispatch(deleteProductRequest(newProduct.id));
        setNewProduct(resetProduct);
    }

    return (
        <div className="createProducContainer">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="errorContainer">
                    <h2 className="errorTitle">{!canSubmit ? 'Can Submit' : 'Errors:'}</h2>
                    <ul className="errorList">
                        {!product.title && <li>{errorMessages.invalidTitle}</li>}
                        {!(Number(product.price) > 0) && <li>{errorMessages.invalidPrice}</li>}
                        {!product.description && <li>{errorMessages.invalidDescription}</li>}
                        {!product.category && <li>{errorMessages.invalidCategory}</li>}
                        {!product.image && <li>{errorMessages.invalidImageUrl}</li>}
                    </ul>
                </div>
                <div className='buttonContainer'>
                    {!edit && (
                        <button name="create" type="submit" disabled={canSubmit}>
                            Create Product
                        </button>
                    )}
                    {edit && (
                        <button name="edit" type="submit" disabled={canSubmit}>
                            Edit Product
                        </button>
                    )}
                </div>
            </form>
            {
                newProduct && (
                    <div className="productContainer">
                        <h2 className="productTitle">{newProduct.title}</h2>
                        <img className="productImage" src={newProduct.image} alt={newProduct.title} width={100} />
                        <p className="productPrice"><strong>Price:</strong> ${newProduct.price}</p>
                        <p className="productDescription"><strong>Description:</strong> {newProduct.description}</p>
                        <p className="productCategory"><strong>Category:</strong> {newProduct.category}</p>
                        <div className="buttonContainer">
                            {!edit && (<button className="editButton" onClick={editNewProduct}>Edit</button>)}
                            <button className="deleteButton" onClick={submitDeleteNewProduct}>Delete</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CreateProduct;