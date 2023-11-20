const RupiahFormatter = number => {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);

  return formattedNumber;
};

export default RupiahFormatter;
