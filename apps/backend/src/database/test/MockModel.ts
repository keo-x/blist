export abstract class MockModel<T> {
  protected abstract entityStub: T

  async find(): Promise<T[]> {
    return [this.entityStub]
  }

  create(value: Partial<T>): T {
    return {...this.entityStub, ...value}
  }

  async save(value: T): Promise<T> {
    return value
  }

  async findOneBy(): Promise<T> {
    return this.entityStub
  }
}
