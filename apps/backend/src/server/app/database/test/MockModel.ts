export abstract class MockModel<T> {
  protected abstract entityStub: T

  async find(): Promise<T[]> {
    return [this.entityStub]
  }

  create(value: Partial<T>): T {
    return {...this.entityStub, ...value}
  }

  async save(entity: T): Promise<T> {
    return entity
  }

  async findOneBy(): Promise<T> {
    return this.entityStub
  }
}
