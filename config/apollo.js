import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
    uri:"http://localhost:4000/",
    fetch
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
    link : authLink.concat(httpLink)
});

export default client;