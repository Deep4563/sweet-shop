class SweetShop {
  constructor() {
    this.inventory = [];
  }

  addSweet(sweet) {
    // 🔁 Check for duplicate ID
    const existsById = this.inventory.find(s => s.id === sweet.id);
    if (existsById) {
      throw new Error('Sweet with this ID already exists');
    }

    // 🔁 Check for duplicate Name (case-insensitive)
    const existsByName = this.inventory.find(
      s => s.name.toLowerCase() === sweet.name.toLowerCase()
    );
    if (existsByName) {
      throw new Error('Sweet with this name already exists');
    }

    this.inventory.push(sweet); // ✅ Only push if no duplicate
  }

  getAllSweets() {
    return this.inventory;
  }
}

module.exports = SweetShop;
