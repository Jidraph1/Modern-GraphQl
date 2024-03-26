export const typeDefs = `#graphql

type Product {
    id: ID!
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      onSale: Boolean!
    
}

type Query {
    products: [Product]
}`