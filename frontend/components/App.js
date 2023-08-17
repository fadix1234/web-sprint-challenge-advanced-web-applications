import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import { axiosWithAuth } from '../axios'



const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate("/") }
  const redirectToArticles = () => { navigate("/articles")}

  const logout = () => {
    // ✨ implement
    localStorage.removeItem('token')
    setMessage('Goodbye!')
    redirectToLogin()

    //redirectToLogin("/")
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
  }

  const login = (payload) => {
    setMessage('')
    setSpinnerOn(true)
    axios.post('http://localhost:9000/api/login', payload)
    .then(res => {
      console.log(res, 'GRAPE')
     localStorage.setItem('token', res.data.token);
     setMessage(res.data.message)
     navigate('/articles')
     setSpinnerOn(false)
    })
    .catch(err => console.log (err))
    console.log(payload, 'APPLE');
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  }

  const getArticles = () => {
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().get('http://localhost:9000/api/articles')
    .then(res => {
      console.log(res, 'TOMATO')
      setArticles(res.data.articles)
      setMessage(res.data.message)
      setSpinnerOn(false)
    
    }) 
    .catch(err => { 
      if (err.response.status === 401) {
      redirectToLogin()
      }
      setSpinnerOn(false)
      console.log (err.response.status)
    })
    
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }
  console.log(articles,'CHERRY')

  const postArticle = article => {
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().post('http://localhost:9000/api/articles',article)
    .then(res => {
      console.log(res, 'GRAPEFRUIT')
      const newArticles = articles
      newArticles.push(res.data.article)
      console.log(articles,'HI')

      setArticles(newArticles)
      setMessage(res.data.message)
      setSpinnerOn(false)
      
    
    })
    .catch(err => console.log (err))
    setSpinnerOn(false)
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {

    axiosWithAuth().put('http://localhost:9000/api/articles/:article_id', article)
    .then(res => {
    //
    // click edit it populates form values
    //cancel edit button clears form values 
    //submit button puts(updates)  the Articles
    //turns spinner on
    //clears form values
    //turn spinner off
    //sets message Nice update

    // ✨ implement
    // You got this!
  })}

  const deleteArticle = article_id => {
    // ✨ implement
  }
  console.log(currentArticleId,'HEY')
  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on = {spinnerOn} />
      <Message message = {message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login = {login} logout= {logout}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle = {postArticle}
              articles = {articles}
              currentArticleId = {currentArticleId}
              />
              <Articles getArticles = {getArticles} 
              articles = {articles}
              redirectToLogin = {redirectToLogin}
              setCurrentArticleId={setCurrentArticleId}
               />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
