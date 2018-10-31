import React from 'react';
import numberToCurrency from "../../lib/numberToCurrency";

const ResultSearchItem = ({data}) => {
    if (!("type" in data) || !("quadrature" in data) || !("price" in data)) throw new Error(`${JSON.stringify(data)} должен содержать type, quadrature, price`);
    return (
        <div className="result-search-item">
            <div className="result-search-item__title">{`${data.type}, ${data.quadrature} М2`}</div>
            <div className="result-search-item__price">{`Цена: ${numberToCurrency(data.price)}`}</div>
            {data.isMortgage && <div className="result-search-item__mortgage">Ипотека</div>}
            {data.isInstallment && <div className="result-search-item__installment">Рассрочка</div>}
        </div>
    );
};

export default ResultSearchItem;