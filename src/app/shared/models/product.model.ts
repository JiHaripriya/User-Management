export class Product {
  constructor(
    public category_id: number,
    public category_name: string,
    public createdAt: string,
    public description: string,
    public id: number,
    public image: string,
    public name: string,
    public price: number,
    public quantity: number,
    public status: string,
    public subcategory_id: number,
    public subcategory_name: string,
    public updatedAt: string
  ) {}
}
