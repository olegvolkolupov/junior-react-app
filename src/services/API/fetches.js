import { client, Query } from '@tilework/opus';

client.setEndpoint("http://localhost:4000");

export async function getCurrencies() {
  let currencyQuery = new Query(`currencies{label,symbol}`);
  let result = await client.post(currencyQuery);
  return result.currencies;
};

export async function getCategoriesNames() {
  let categoriesNamesQuery = new Query(`categories{name}`);
  let result = await client.post(categoriesNamesQuery);
  return result.categories;
};

export async function getProductsForCurrentCategory(category) {
  let productsForCurrentCategoryQuery = new Query(`
    category(input: {title: "${category}"}) {
      products{
        id
        name
        brand
        inStock
        gallery
        attributes{
          id
          name
          type
          items{
            id
            value
            displayValue
          }
        }
        prices{
          amount
          currency{
            label
            symbol
          }
        }
      }
    }
  `);
  let result = await client.post(productsForCurrentCategoryQuery);
  return result.category.products;
}

export async function getProductDetail(productId) {
  let productDetailQuery = new Query(`
  product(id: "${productId}") {
    id
    name
    brand
    inStock
    gallery
    description
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
  }
  `);
  let result = await client.post(productDetailQuery);
  return result.product;
}