import React from 'react';
import numberToCurrency from "../../lib/numberToCurrency";

const ResultSearchItem = ({data}) => {
    if (!("type" in data) || !("quadrature" in data) || !("price" in data)) throw new Error(`${JSON.stringify(data)} должен содержать type, quadrature, price`);
    return (
        <div className="result-search-item">
            <div className="result-search-item__title result-search-item__line">
                <span>{data.type}, </span>
                <span>{data.quadrature} M</span>
                <span className="result-search-item__sup">2</span>
            </div>
            <div className="result-search-item__price result-search-item__line">{numberToCurrency(data.price)}</div>
            {data.isMortgage && <div className="result-search-item__mortgage result-search-item__line">Ипотека</div>}
            {data.isInstallment && <div className="result-search-item__installment result-search-item__line">Рассрочка</div>}
        </div>
    );
};

export default ResultSearchItem;
