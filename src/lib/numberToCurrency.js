const numberToCurrency = number => number.toLocaleString('ru-Ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0});
export default numberToCurrency;