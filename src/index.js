import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "axios";
//axios are basically used to fetch the data
import {Provider} from 'react-redux'
import { store } from "./store/store";

// /Axios setup
//here we are already fetching the baseURL then next we need to just add the fetching url -->app.js
axios.defaults.baseURL = "https://api.themoviedb.org/3";
// This line sets the default base URL for all Axios requests
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;
//axios.defaults.headers.common['Authorization']--> sets default header for all the axios request it sets 'authorization' header to a bearer token whic
//is used for authentication

//Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`--> This part constructs the value for the Authorization header. It uses a Bearer token, which is a type of token used for authentication in HTTP headers.
//process.env.REACT_APP_ACCESS_TOKEN is an environment variable that should contain your access token. This token is necessary to authenticate requests to the TMDB (The Movie Database) API.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 // <React.StrictMode>
 <Provider store={store}>
    <RouterProvider router={router} />

 </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
