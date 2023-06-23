/**
 * This function calculates total prices of an order
 * @param {Array} products cartProducts: Array of Objects
 * @returns {number} Total price
 */

export const totalPrice = (products) => {
    let sum = 0;
    products.forEach(product => {
        sum += product.price
    });
    
    return sum;
}