import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { PaymentSummary } from "./PaymentSummary";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("Payment Summary Component", () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };

    loadCart = vi.fn();
  });

  it("Displays the correct details", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />,
      </MemoryRouter>,
    );

    expect(screen.getByText("Items (3):")).toBeInTheDocument();

    expect(
      screen.getByTestId("payment-summary-product-cost"),
    ).toHaveTextContent("$42.75");

    expect(
      screen.getByTestId("payment-summary-shipping-cost"),
    ).toHaveTextContent("$4.99");

    expect(
      screen.getByTestId("payment-summary-total-before-tax"),
    ).toHaveTextContent("$47.74");

    expect(screen.getByTestId("payment-summary-tax")).toHaveTextContent(
      "$4.77",
    );

    expect(screen.getByTestId("payment-summary-total")).toHaveTextContent(
      "$52.51",
    );
  });

  it("places an order", async () => {
    axios.post.mockResolvedValue({});
    loadCart.mockResolvedValue();

    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );
    const placeOrderButton = screen.getByTestId("place-order-button");
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();

    await waitFor(
      () => {
        expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
      },
      { timeout: 1000 },
    );
  });
});
