import { gql } from "@apollo/client";
import { client } from "../http/client";

export function getCategories() {
  return client
    .query({
      query: gql`
        query getCategories {
          categories {
            name
            products {
              id
              name
              brand
              inStock
              gallery
              description
              category
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
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
            }
          }
        }
      `,
    })
    .then((result) => result.data.categories);
}

export function getCategoriesNames() {
  return client
    .query({
      query: gql`
        query getCategoriesNames {
          categories {
            name
          }
        }
      `,
    })
    .then((result) => result.data.categories);
}

export function getCurrencies() {
  return client
    .query({
      query: gql`
        query getCurrencies {
          currencies {
            label
            symbol
          }
        }
      `,
    })
    .then((result) => result.data.currencies);
}


export function getProductDetail(id){

  return client
    .query({
      query: gql`
        query getProductDetail($id: String!) {
          product(id: $id) {
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
        }
      `,
      variables: { id },
    })
    .then((result) => result.data.product);
}
