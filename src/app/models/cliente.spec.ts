import { ClienteModel } from './cliente';

describe('Cliente', () => {
  it('should create an instance', () => {
    expect(new ClienteModel()).toBeTruthy();
  });
});
