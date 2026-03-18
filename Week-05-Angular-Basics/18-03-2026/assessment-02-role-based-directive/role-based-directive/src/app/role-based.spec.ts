import { RoleBased } from './role-based';

describe('RoleBased', () => {
  it('should create an instance', () => {
    const directive = new RoleBased();
    expect(directive).toBeTruthy();
  });
});
