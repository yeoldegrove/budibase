
import { render } from "@testing-library/svelte";
import EditableLable from "../inputs/EditableLabel";


describe("ErrorsBox", () => {
    it('renders a header and assosicated value', async () => {
        const { container } = render(EditableLable, { type: 'heading', value: 'heading value' });
        expect(container.getElementsByClassName('spectrum-Heading').length).toBe(1);
        expect(container.getElementsByClassName('spectrum-Heading')[0].textContent).toContain('heading value')
    })


    it('Error', async () => {
        const { container } = render(EditableLable, { type: 'body', value: 'body value' });
        expect(container.getElementsByClassName('spectrum-Body').length).toBe(1);
        expect(container.getElementsByClassName('spectrum-Body')[0].textContent).toContain('body value')
    })

})