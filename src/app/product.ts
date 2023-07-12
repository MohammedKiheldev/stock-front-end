export class Product {
  id!: number;
  name!: string;
  description!: string;
  quantity!: number;
  price!: number;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    quantity: number = 0,
    price: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = typeof quantity === 'string' ? Number(quantity) : quantity;
    this.price = typeof price === 'string' ? Number(price) : price;
  }
}
