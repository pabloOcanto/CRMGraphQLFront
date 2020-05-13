import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import fetch from 'node-fetch';
import Router from "next/router";


const httpLink = createHttpLink({
    uri:"http://localhost:4000/",
    fetch
});

const logoutLink = onError(({ graphQLErrors,networkError }) => {
  
    if (graphQLErrors){
        graphQLErrors.map(({ message, locations, path, extensions}) =>{
            if (extensions.code === "UNAUTHENTICATED"){
                //localStorage.removeItem("token");
                Router.push("/login");
            }}
        );
    }        
  });

const authLink = setContext((_,{headers})=>{

    let authorization ="";
    const token = localStorage.getItem("token");

    if (token){
        authorization = `Bearer ${token}`;
    }

    return{
        headers:{
            ...headers,
            authorization
        }
    }

});


const client = new ApolloClient({
    connectToDevTools:true,
    cache:new InMemoryCache(),
    link : logoutLink.concat(authLink.concat(httpLink))
});

export default client;