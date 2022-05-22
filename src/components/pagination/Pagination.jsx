import React from 'react';
import {GetPagesArray} from "../../utils/pages";
import {usePagesArray} from "../../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => {
    // let pagesArray = GetPagesArray(totalPages);
    let pagesArray = usePagesArray(totalPages);
    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                // если номер состояния страницы равен текущей итерации .map то выделять номер текущей страницы классом
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;