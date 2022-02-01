
import { render, fireEvent, getByTitle, screen } from "@testing-library/svelte";
import NPSFeedBackForm from "../../feedback/NPSFeedbackForm";
import '@testing-library/jest-dom';


describe("NPSFeedbackForm", () => {

    it('Navigates past the first selection', async () => {
        const { getByText, debug } = render(NPSFeedBackForm);
        const button = getByText('Click me')
        console.log(button)
        debug()
        await fireEvent.click(button)
        debug()
        expect(await screen.findByText(/What could be improved most in Budibase?/i)).toBeInTheDocument()
    })
})