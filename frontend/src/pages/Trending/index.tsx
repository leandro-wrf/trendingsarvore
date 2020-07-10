import React, { useState, useEffect, ChangeEvent } from 'react'
import { MdGif, MdFormatQuote } from 'react-icons/md'


import Head from '../../components/Head'
import DropZone from '../../components/DropZone'

import './styles.css'

import search from '../../assets/search.svg'
import avatarCircle from '../../assets/avatar_user_circle.png'
import avatar2 from '../../assets/avatar_user2.png'

import api from '../../service/api'

const Trending = () => {
  const [tweets, setTweets]: any = useState([])
  const [trends, setTrends]: any = useState([])
  const [heartColor, setHeartColor] = useState(0)
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File>()
  const [topic, setTopic]: any = useState({
    id: 1,
    text: 'undefined'
  })

  const [searchTrending, setSearchTrending] = useState('')
  const [buttonSelected, setButtonSelected] = useState(0);
  const [load, setLoad] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File>()

  useEffect(() => {
    async function loadTweets() {
      const response = await api.get('/tweets')
    
      setTweets(response.data.reverse())
    }

    if(load) {
      loadTweets()   
    }
  }, [topic])

  useEffect(() => {
    async function loadTrending() {
      const response = await api.get('/trending')

      setTrends(response.data)
    }

    loadTrending()
  }, [])

  function handleHeart(heart: number) {
    const newArray = tweets.map((tweet:any, index:number) => {
      let value = 0;
      if ( heart === index ) {
        value = 1;
      } else if (tweet.heart === 1) {
        value = 1;
      }

      if ( heart === index) {
        if(tweet.heart === 1) {
          value = 0;
        }
      }

      return {
        id: tweet.id,
        image: tweet.image,
        text: tweet.text,
        user_id: tweet.user_id,
        created_at: tweet.created_at,
        heart: value
      }
    })

    setTweets(newArray)
  }

  async function tweetsByTopic(trendTopic: string, select: number) {
    if (topic.text === trendTopic) {
      setLoad(1)
      setTopic({
        id: 1,
        text: 'undefined',
        select: 0
      })

      const newArray = trends.map((trend: any, index: number) => {
        let value
        if (select === index) {
          value = 0
        }

        return {
          count: trend.count,
          text: trend.text,
          select: value
        }
      })

      setTrends(newArray)

      return
    }

    const response = await api.get(`/trending/${trendTopic}`)

    setTweets(response.data)
    if(topic.id) {
      setLoad(0)
      setTopic({
        id: 1,
        text: trendTopic,
        select: 1
      })
      const newArray = trends.map((trend: any, index: number) => {
        let value

        if (select === index) {
          value = 1
        }

        if (index !== select) {
          console.log('ok')
          if (trend.select === 1)
            console.log('aqui')
            value = 0;
        }

        return {
          count: trend.count,
          text: trend.text,
          select: value
        }
      })

      setTrends(newArray)
    }
  }

  async function searchTweets(trendTopic: string) {
    console.log(trendTopic)

    if (topic.text === trendTopic) {
      setLoad(1)
      setTopic({
        id: 1,
        text: 'undefined'
      })
      return
    }

    const response = await api.get(`/search/${trendTopic}`)

    setTweets(response.data)
    setLoad(0)
    if(topic.id) {
      setTopic({
        id: 0,
        text: trendTopic
      })
    }
  }

  async function addComment() {
    const data = new FormData()

    data.append('text', comment)

    if(image) {
      data.append('image', image)
    }

    const response = await api.post('/tweet/1', data)
    setTweets([
      response.data,
      ...tweets
    ])
    setComment('')
    tweetsByTopic('undefined', 100000)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target

    setSearchTrending(value)
  }

  function handleComment(event: ChangeEvent<HTMLTextAreaElement>) {
    const {name, value} = event.target

    setComment(value)
  }

  return (
    <div className="trending">
    <Head /> 

    <div>
      <div className="center">
        <div className="container-left">
          <section className="container-comentario">
            <div className="row">
              <div className="avatar">
                <img src={avatarCircle} alt="avatar_circle" />
              </div>
              <div className="comentario">
                <div className="form-textarea">
                  <textarea 
                    placeholder="Conte sobre seu livro..." 
                    id="message" 
                    name="comment" 
                    rows={5} 
                    cols={33}
                    value={comment}
                    onChange={handleComment}
                  />
                </div>
              </div>
            </div>

            <div className="interacao">
              <div className="row">
                <div className="icon-like iconi">
                  <div className="row-main">
                    <DropZone onFileUploaded={setSelectedFile}/>
                    <div className="row-main-i"> 
                      <MdGif size={32} color="#333333" />
                      <MdFormatQuote size={32} color="#333333" />
                    </div>
                  </div>
                </div>
                <div className="botao-postar">
                  <button onClick={addComment}>Contar</button>
                </div>
              </div>
            </div>   
          </section>

          {tweets.map((tweet:any) => (
            <section key={tweet.id} className="container-comentario">
              <div className="row-main">
                <div className="avatar">
                  <img src={avatar2} alt="avatar2" />
                </div>
                <div className="comentario">
                  <p>
                    {tweet.text}
                  </p>
                </div>
              </div>
                <div className="interacao">
                  <div className="row"> 
                    <div className="form">
                      <input placeholder="Comentário..." value="" />
                    </div>

                    <div className="icons">
                      <div className="icon-like icon">
                        <i className="icon-heart"></i>
                      </div>
                      <div className="icon-comentario icon">
                        <i className="icon-comment"></i>
                      </div>
                    </div>
                  </div>
                </div>    
            </section>
          ))}
    
          <section className="container-comentario">
            <div className="row">
              <div className="avatar">
                <img src={avatar2} alt="avatar2" />
              </div>
              <div className="comentario">
                <p>
                  “Não sabemos quanto tempo nos resta, não podemos desperdiçá-lo 
                  lamentando coisas que não podemos mudar” - Stephen King
                </p>
              </div>
            </div>
              <div className="interacao">
                <div className="row"> 
                  <div className="form">
                    <input placeholder="Comentário..." value="" />
                  </div>

                  <div className="icons">
                    <div className="icon-like icon">
                      <i className="icon-heart"></i>
                    </div>
                    <div className="icon-comentario icon">
                      <i className="icon-comment"></i>
                    </div>
                  </div>
                </div>
              </div>    
          </section>   
        </div>
    
        <div className="container-right">
          <div className="content-input-trendings">
            <div className="input-trendings">
                <input
                  placeholder="Busque um Trending"
                  name="search"
                  value={searchTrending}
                  onChange={handleChange}
                />
                <button onClick={() => searchTweets(searchTrending)}>
                  <img className="icon-search" src={search} alt="search" />
                </button>
            </div>        
          </div>
    
          <div className="sidebar-trendings">
            <div className="titulo">
              Trending Topics
              <div className="subtitulo">
                Assuntos no Momento
              </div>
            </div>
            {trends.map((trend:any, index:number) => (
              <div className="content-trending" key={index}>  
                <div className="titulo-trending">
                  <button onClick={() => tweetsByTopic(trend.text, index)}>
                    # {trend.text}
                  </button>   
                </div>
              </div>
            ))}
          </div>  
        </div>
      </div>   
    </div>
    <footer>

    </footer>
    </div>
  )
}

export default Trending