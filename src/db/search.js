import db from "./db";

const filter = (item, data) => {
    const min = data.price.min || 0;
    const max = data.price.max || 10 ** 10;

    return item.type === data.type
        && item.price >= min
        && item.price <= max
        && item.isMortgage === data.isMortgage
        && item.isInstallment === data.isInstallment
};

const search = data => db.filter(item => filter(item, data));

export default search;