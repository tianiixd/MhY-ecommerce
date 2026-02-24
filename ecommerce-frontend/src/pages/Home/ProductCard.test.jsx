import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe("ProductCard Component", () => {
  let product;
  let loadCart;
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "/images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

    loadCart = vi.fn();
  });

  it("Displays the product details correctly", () => {
    render(<ProductCard product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "/images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "/images/ratings/rating-45.png",
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("Adds a product to the cart", async () => {
    render(<ProductCard product={product} loadCart={loadCart} />);

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled();
  });

  it("Selects a quantity", async () => {
    render(<ProductCard product={product} loadCart={loadCart} />);

    const quantitySelector = screen.getByTestId("product-quantity-selector");
    await user.selectOptions(quantitySelector, "3");

    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
    });

    expect(quantitySelector).toHaveValue("3");
    expect(loadCart).toHaveBeenCalled();
  });
});
