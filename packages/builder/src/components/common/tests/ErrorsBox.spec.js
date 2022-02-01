
import { render } from "@testing-library/svelte";
import ErrorsBox from "../ErrorsBox";


describe("ErrorsBox", () => {
  it('Does not show an error if none are passed', async () => {
    const { container } = render(ErrorsBox, { errors: [] });
    expect(container.getElementsByClassName('container').length).toBe(0);
  })

  it('Error', async () => {
    const { container } = render(ErrorsBox, { errors: [{ message: 'this is an error', dataPath: '/a path' }] });
    expect(container.getElementsByClassName('container').length).toBe(1);
    expect(container.getElementsByClassName('container')[0].textContent).toContain('this is an error');
  })

})