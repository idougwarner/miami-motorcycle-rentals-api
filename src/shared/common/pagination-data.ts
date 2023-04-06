export class PaginationData<T> {
  list!: T[];
  count!: number;
  page!: number;
  limit!: number;

  constructor(data: T[], count: number, page: number, limit: number) {
    this.list = data;
    this.count = count;
    this.page = page;
    this.limit = limit;
  }
}
