
import { render } from "@testing-library/svelte";
import ChooseIconModal from "../../start/ChooseIconModal";


describe("ChooseIconModal", () => {
    it('Does not show an error if none are passed', async () => {
        const { container } = render(ChooseIconModal, { props: { app: { icon: "", name: "" } } })

    })

})