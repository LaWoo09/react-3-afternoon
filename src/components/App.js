import React, { Component } from 'react';
import axios from "axios"
import Post from "./Post/Post"


import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
const baseUrl = "https://practiceapi.devmountain.com/api"
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/posts`).then(res => {
      
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(`${baseUrl}/posts?id=${id}`, {text}).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`${baseUrl}/posts?id=${id}`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`${baseUrl}/posts`, {text}).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    let mappedPost = posts.map((post) => {
    return <Post key={post.id} 
    text={post.text} 
    date={post.date}
    id={post.id}
    updatePostFn={this.updatePost}
    deletePostFn={this.deletePost}
    >{post}</Post>
    })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {mappedPost}
          
        </section>
      </div>
    );
  }
}

export default App;
