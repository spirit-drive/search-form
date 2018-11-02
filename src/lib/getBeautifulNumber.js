const getBeautifulNumber = number => Number(number).toLocaleString('ru-Ru', {useGrouping: true});

export default getBeautifulNumber;