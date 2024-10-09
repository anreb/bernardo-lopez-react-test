import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../redux/actions/productActions';
import { Product } from '../types/productTypes';
import { useNavigate } from 'react-router-dom';
import "./Products.scss"

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, products, filteredProducts, error, currentPage, totalPages } = useSelector((state: any) => state.products);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 2; // Show 2 products per page

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductsRequest());
        }
    }, [dispatch]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            dispatch({ type: 'FILTER_PRODUCTS', payload: filtered });
            handlePaginationChange(1);
        } else {
            dispatch({ type: 'FILTER_PRODUCTS', payload: products });
        }
    }, [searchTerm, products, dispatch]);

    const handleRowClick = (product: Product) => {
        navigate(`/products/${product.id}`);
    };

    const handleSort = (column: keyof Product) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortDirection === 'asc') {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });
        dispatch({ type: 'FILTER_PRODUCTS', payload: sortedProducts });
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handlePaginationChange = (page: number) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the products to display on the current page
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    const renderPagination = () => {
        const totalPageCount = Math.ceil(filteredProducts.length / pageSize);
        const pages: number[] = [];
        if (currentPage >= totalPageCount - 2 && totalPageCount > 5) {
            for (let i = totalPageCount - 4; i <= totalPageCount; i++) {
                pages.push(i);
            }
            return (
                <div>
                    {pages.map(page => (
                        <button
                            key={page + 10}
                            onClick={() => handlePaginationChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            );
        } else if (totalPageCount > 5 && currentPage >= 4) {
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                if (i > totalPageCount) break;
                pages.push(i);
            }
            return (
                <div>
                    {pages.map(page => (
                        <button
                            key={page + 10}
                            onClick={() => handlePaginationChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            );
        } else {
            for (let i = 1; i <= totalPageCount; i++) {
                if (i > 5) break;
                pages.push(i);
            }
            return (
                <div>
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => handlePaginationChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            );
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='productsContainer'>
            <h1>Products</h1>
            <input
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="styledTable">
                <thead>
                    <tr className="tableHeader">
                        <th className="tableCell" onClick={() => handleSort('title')}>Title</th>
                        <th className="tableCell" onClick={() => handleSort('price')}>Price</th>
                        <th className="tableCell" onClick={() => handleSort('category')}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {productsToDisplay.map((product: Product) => (
                        <tr key={product.id} className="tableRow" onClick={() => handleRowClick(product)}>
                            <td className="tableCell">{product.title}</td>
                            <td className="tableCell">${product.price}</td>
                            <td className="tableCell">{product.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='paginationContainer'>
                {renderPagination()}
            </div>
        </div>
    );
};

export default Products;