import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import {typeDefs} from './schema.js'

import db from './db.js'

// Resolvers
const resolvers ={
    Query: {
        products() {
            return db.products
        },
        product(_, args){
            return db.products.find((product) => product.id === args.id);
        },
        categories() {
            return db.categories
        },
        category(_, args){
            return db.categories.find((category) => category.id === args.id)
        }
    },
    Category:{
        products(parent){
            return db.products.filter((p) => p.categoryId === parent.id)
        }
    },
    Product:{
        categories(parent){
            return db.categories.filter((c) => c.productId === parent.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: {port: 4000},
});

console.log(`🚀 Server ready at: ${url}`)