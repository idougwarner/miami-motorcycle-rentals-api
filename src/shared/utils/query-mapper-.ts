export class QueryMapper {
  query: string = '';

  constructor(query) {
    this.query = query;
  }

  addParam(key: string, value: string | number | number[]): QueryMapper {
    this.query = this.query.replace(
      new RegExp(':' + key, 'g'),
      value.toString(),
    );

    return this;
  }

  getQuery() {
    return this.query;
  }
}
