const db = require("./db");

const checkType = (item, data) => {
    if (!data.type.length || !data.type) {
        return true;
    }
    if (Array.isArray(data.type)) {
        for (let key in data.type) {
            if (item.type === data.type[key]) return true;
        }
        return false;
    } else {
        return item.type === data.type;
    }
};

const checkPrice = (item, data) => {
    const min = data.price.min || 0;
    const max = data.price.max || Infinity;

    return item.price >= min && item.price <= max;

};

const checkMortgage = (item, data) => {
    return !data.mortgage || item.isMortgage === data.mortgage;
};

const checkInstallment = (item, data) => {
    return !data.installment || item.isInstallment === data.installment;
};

const filter = (item, data) => {
    return checkType(item, data)
        && checkPrice(item, data)
        && checkMortgage(item, data)
        && checkInstallment(item, data);
};

const search = data => data ? db.filter(item => filter(item, data)) : db;

module.exports = search;