class SweetShop {
  constructor() {
    this.inventory = [];
  }

  addSweet(sweet) {
    const existsById = this.inventory.find(s => s.id === sweet.id);
    if (existsById) {
      throw new Error('Sweet with this ID already exists');
    }

    const existsByName = this.inventory.find(
      s => s.name.toLowerCase() === sweet.name.toLowerCase()
    );
    if (existsByName) {
      throw new Error('Sweet with this name already exists');
    }

    this.inventory.push(sweet);
  }

  getAllSweets() {
    return this.inventory;
  }

  deleteSweet(id) {
    const index = this.inventory.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Sweet with this ID does not exist');
    }
    this.inventory.splice(index, 1);
  }

  updateSweet(id, newData) {
    const sweet = this.inventory.find(s => s.id === id);
    if (!sweet) {
      throw new Error('Sweet with this ID does not exist');
    }
    Object.assign(sweet, newData);
  }

  searchSweets({ name, category, minPrice, maxPrice }) {
    return this.inventory.filter(sweet => {
      const matchName = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchCategory = category ? sweet.category.toLowerCase() === category.toLowerCase() : true;
      const matchPrice = (minPrice === undefined || sweet.price >= minPrice) &&
                         (maxPrice === undefined || sweet.price <= maxPrice);
      return matchName && matchCategory && matchPrice;
    });
  }

  sortSweets(byField) {
    return [...this.inventory].sort((a, b) => {
      if (typeof a[byField] === 'string') {
        return a[byField].localeCompare(b[byField]);
      }
      return a[byField] - b[byField];
    });
  }

  purchaseSweet(id, quantity) {
    const sweet = this.inventory.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet with this ID does not exist');
    if (sweet.quantity < quantity) throw new Error('Not enough stock available');
    sweet.quantity -= quantity;
  }

  restockSweet(id, quantity) {
    const sweet = this.inventory.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet with this ID does not exist');
    sweet.quantity += quantity;
  }
}

module.exports = SweetShop;
