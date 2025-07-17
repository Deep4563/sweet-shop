const SweetShop = require('../services/SweetShop');

describe('SweetShop System', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  it('adds a new sweet', () => {
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 10 });
    expect(shop.getAllSweets().length).toBe(1);
  });

  it('prevents duplicate ID', () => {
    shop.addSweet({ id: 1, name: 'Ladoo', category: 'Nut-Based', price: 20, quantity: 10 });
    expect(() => {
      shop.addSweet({ id: 1, name: 'Barfi', category: 'Milk-Based', price: 25, quantity: 5 });
    }).toThrow('Sweet with this ID already exists');
  });

  it('prevents duplicate name (case-insensitive)', () => {
    shop.addSweet({ id: 1, name: 'Rasgulla', category: 'Milk-Based', price: 30, quantity: 10 });
    expect(() => {
      shop.addSweet({ id: 2, name: 'rasgulla', category: 'Milk-Based', price: 35, quantity: 15 });
    }).toThrow('Sweet with this name already exists');
  });

  it('deletes a sweet by ID', () => {
    shop.addSweet({ id: 1, name: 'Jalebi', category: 'Sugar-Based', price: 15, quantity: 20 });
    shop.deleteSweet(1);
    expect(shop.getAllSweets().length).toBe(0);
  });

  it('throws error for non-existent delete ID', () => {
    expect(() => shop.deleteSweet(999)).toThrow('Sweet with this ID does not exist');
  });

  it('updates a sweet by ID', () => {
    shop.addSweet({ id: 1, name: 'Halwa', category: 'Nut-Based', price: 30, quantity: 10 });
    shop.updateSweet(1, { price: 40, quantity: 5 });
    const sweet = shop.getAllSweets()[0];
    expect(sweet.price).toBe(40);
    expect(sweet.quantity).toBe(5);
  });

  it('searches sweets by name/category/price', () => {
    shop.addSweet({ id: 1, name: 'Barfi', category: 'Milk-Based', price: 40, quantity: 10 });
    shop.addSweet({ id: 2, name: 'Soan Papdi', category: 'Flour-Based', price: 25, quantity: 20 });
    const results = shop.searchSweets({ category: 'Milk-Based', minPrice: 30 });
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Barfi');
  });

  it('sorts sweets by price', () => {
    shop.addSweet({ id: 1, name: 'Rasgulla', category: 'Milk-Based', price: 30, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Ladoo', category: 'Nut-Based', price: 20, quantity: 30 });
    const sorted = shop.sortSweets('price');
    expect(sorted[0].price).toBe(20);
  });

  it('purchases sweets with sufficient stock', () => {
    shop.addSweet({ id: 1, name: 'Jalebi', category: 'Sugar-Based', price: 15, quantity: 10 });
    shop.purchaseSweet(1, 5);
    expect(shop.getAllSweets()[0].quantity).toBe(5);
  });

  it('throws error if not enough stock', () => {
    shop.addSweet({ id: 1, name: 'Jalebi', category: 'Sugar-Based', price: 15, quantity: 3 });
    expect(() => shop.purchaseSweet(1, 5)).toThrow('Not enough stock available');
  });

  it('restocks sweets by ID', () => {
    shop.addSweet({ id: 1, name: 'Peda', category: 'Milk-Based', price: 20, quantity: 10 });
    shop.restockSweet(1, 10);
    expect(shop.getAllSweets()[0].quantity).toBe(20);
  });
});
