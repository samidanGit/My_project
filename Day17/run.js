const subtotal = (...prices) => prices.reduce((sum, price) => sum + price, 0);

const discountBy = (rate) => (amount) => amount * (1 - rate);

const withVat = (amount) => amount * 1.15;
const toETB = (amount) => `${amount.toFixed(2)} ETB`;

const makeReceiptMaker = () => {
  let orderNumber = 0;

  return (finalAmount) => {
    orderNumber += 1;
    return `#${orderNumber}: ${toETB(finalAmount)}`;
  };
};

const applyMemberDiscount = discountBy(0.10);
const printReceipt = makeReceiptMaker();

const order1Sub = subtotal(350, 450, 200);
const order1Discounted = applyMemberDiscount(order1Sub);
const order1Final = withVat(order1Discounted);

console.log(printReceipt(order1Final));

const order2Sub = subtotal(150, 250);
const order2Discounted = applyMemberDiscount(order2Sub);
const order2Final = withVat(order2Discounted);

console.log(printReceipt(order2Final));
