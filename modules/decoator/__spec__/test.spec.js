import BaseModel from '../test.ts';

describe('test', () => {
  it('base', () => {
    expect(new BaseModel()).toEqual({_fields: {}});
  });
});
