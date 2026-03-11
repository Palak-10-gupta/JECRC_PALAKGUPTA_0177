const cart = [500, 1200, 800, 1500];

// calculate total cart value
const totalPrice = cart.reduce((sum, price) => sum + price, 0);

console.log(totalPrice);