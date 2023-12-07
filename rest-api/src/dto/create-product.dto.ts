export class CreateProductDto {
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly rating: object;
}
