export function createPriceContainer(logoUrl, title, price, className) {
  const container = document.createElement("div");
  container.className = "priceContainer";

  const logoImage = document.createElement("img");
  logoImage.src = chrome.runtime.getURL(logoUrl);
  logoImage.className = "logoImage";

  const priceSpan = document.createElement("span");
  priceSpan.className = className;
  priceSpan.title = title;
  priceSpan.textContent = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  container.append(logoImage, priceSpan);
  return container;
}