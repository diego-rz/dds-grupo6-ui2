import { CitiesPipe } from './cities.pipe';

describe('CitiesPipe', () => {
  it('create an instance', () => {
    const pipe = new CitiesPipe();
    expect(pipe).toBeTruthy();
  });
});
