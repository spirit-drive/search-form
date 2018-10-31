import React from 'react';
import ResultSearchItem from "../ResultSearchItem/ResultSearchItem";

const ResultSearch = ({data}) => {
    if (!Array.isArray(data)) throw new Error(`${JSON.stringify(data)} должны быть массивом`);
    return (
        <div>
            {data.map((item, i) => <ResultSearchItem key={`ResultSearch_ResultSearchItem_fhwkx3_${i}`} data={item}/>)}
        </div>
    );
};

export default ResultSearch;
