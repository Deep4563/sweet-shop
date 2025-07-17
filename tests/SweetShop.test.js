const SweetShop = require('../services/SweetShop');

describe('SweetShop - Add Sweet', () => {
  it('should add a new sweet to the inventory', () => {
    const shop = new SweetShop();
    shop.addSweet({
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    });

    const sweets = shop.getAllSweets();
    expect(sweets.length).toBe(1);
    expect(sweets[0].name).toBe('Kaju Katli');
  });

  it('should not allow duplicate sweet IDs', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1001, name: 'Mithai', category: 'Nut-Based', price: 50, quantity: 20 });

    expect(() => {
      shop.addSweet({ id: 1001, name: 'Rasgulla', category: 'Milk-Based', price: 10, quantity: 50 });
    }).toThrow('Sweet with this ID already exists');
  });

  it('should not allow duplicate sweet names (case-insensitive)', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 40 });

    expect(() => {
      shop.addSweet({ id: 1003, name: 'Gulab Jamun', category: 'Milk-Based', price: 35, quantity: 20 });
    }).toThrow('Sweet with this name already exists');
  });
});
