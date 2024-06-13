import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import './Pagination.css';

const Pagination = () => {
    const { page, totalPages, changePage, movies } = useContext(AppContext);
    const [inputPage, setInputPage] = useState(page);

    if (movies.length === 0) return null;

    const handlePrevPage = () => {
        if (page > 1) {
            changePage(page - 1);
            setInputPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            changePage(page + 1);
            setInputPage(page + 1);
        }
    };

    const handleInputChange = (e) => {
        setInputPage(e.target.value);
    };

    const handleInputBlur = () => {
        const newPage = Math.max(1, Math.min(totalPages, Number(inputPage)));
        changePage(newPage);
        setInputPage(newPage);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1}>
                Previous
            </button>
            <span>
                Page <input type="number" value={inputPage} onChange={handleInputChange} onBlur={handleInputBlur} onKeyPress={handleInputKeyPress} min="1" max={totalPages} /> of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
