import { createPriceContainer } from "./createPriceContainer.js";

const suggestedPriceMultiplier = 1.3;

function parsePrice(card, attributeName) {
  return parseFloat((card.getAttribute(attributeName) || "0").replace(/\./g, "").replace(",", "."));
}

export function displayTotalPrices() {
  const deckElement = document.getElementById("deck-view");
  if (!deckElement) {
    return;
  }

  let totalMinimumPrice = 0;
  let totalMedianPrice = 0;
  let totalLastPrice = 0;
  let totalTcgPlayerPrice = 0;

  const cards = deckElement.querySelectorAll("a");
  cards.forEach((card) => {
    const quantityElement = card.querySelector(".qtd-card");
    const cardQuantity = parseInt(quantityElement?.textContent || "0", 10);

    totalMinimumPrice += cardQuantity * parsePrice(card, "data-preco-menor");
    totalMedianPrice += cardQuantity * parsePrice(card, "data-preco-mediana");
    totalLastPrice += cardQuantity * parsePrice(card, "data-preco-ultimo");
    totalTcgPlayerPrice += cardQuantity * parsePrice(card, "data-preco-tcg");
  });

  const priceElement = document.querySelector(".moeda");
  if (!priceElement) {
    return;
  }

  priceElement.innerHTML = "";

  priceElement.append(
    createPriceContainer(
      "images/arrowDown.svg",
      "Menor Preço",
      totalMinimumPrice,
      "mypCardsPrice"
    ),
    createPriceContainer(
      "images/minus.svg",
      "Preço Mediano",
      totalMedianPrice,
      "mypCardsPrice"
    ),
    createPriceContainer(
      "images/clock.svg",
      "Última Venda",
      totalLastPrice,
      "mypCardsPrice"
    ),
    createPriceContainer(
      "images/tcgPlayerLogo.svg",
      "Preço TCGPlayer",
      totalTcgPlayerPrice,
      "tcgPlayerPrice"
    ),
    createPriceContainer(
      "images/mypCardsLogo.svg",
      "Preço Sugerido",
      totalTcgPlayerPrice * suggestedPriceMultiplier,
      "suggestedPrice"
    )
  );
}
