import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from '../Type';

test("update product's total when products change", async() => {
    render(<Type orderType="products" />);

    const productsTotal = screen.getByText("총 가격:", { exact: false });
    expect(productsTotal).toHaveTextContent("0");

    //도둑들 1매 추가
    const thievesInput = await screen.findByRole("spinbutton", {
        name: "도둑들",
    });

    userEvent.clear(thievesInput);
    userEvent.type(thievesInput, "1");
    expect(productsTotal).toHaveTextContent("10000");
});

