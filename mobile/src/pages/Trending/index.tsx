import React, { useEffect, useState } from 'react'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

import Head from '../../components/Head'

import {
  Container,
  Content,
  BoxComment,
  InputComment,
  RowSpace,
  ContainerFuncs,
  ButtonUpload,
  ButtonText,
  ButtonSend,
  BoxTrending,
  TitleTrending,
  SearchContainer,
  SearchTrending,
  ButtonSearchTrending,
  Row,
  ButtonTrending,
  ButtonTrendingSelect,
  TextTrendingSelect,
  TextTrending,
  BoxComments,
  TitleComments,
  Comment,
  CommentText,
  CommentHeart,
  UserProfile,
  UserName,
  Column,
  Scroll,
  ContainerAny
} from './styled'

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
    if (topic.text === trendTopic) {
      setTopic({
        id: 1,
        text: 'undefined'
      })
      return
    }

    const response = await api.get(`/search/${trendTopic}`)

    setTweets(response.data)
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
    tweetsByTopic('undefined')
  }

  return (
    <Container>
      <Head />

      <Content>
        <BoxComment>
          <InputComment
            numberOfLines={2}
            multiline={true}
            placeholder="Digite seu comentário..."
            value={comment}
            onChangeText={setComment}
          />

          <RowSpace>
            <ContainerFuncs>
              <ButtonUpload>
                <FontAwesome name="image" size={32} color="#525252" />
              </ButtonUpload>

              <ButtonUpload>
                <MaterialIcons name="gif" size={40} color="#525252" />
              </ButtonUpload>

              <ButtonUpload>
                <MaterialIcons name="format-quote" size={34} color="#525252" />
              </ButtonUpload>
            </ContainerFuncs>

            <ButtonSend onPress={() => addComment()}>
              <ButtonText>Enviar</ButtonText>
            </ButtonSend>
          </RowSpace>
        </BoxComment>
        <Scroll
          showsVerticalScrollIndicator={false}
        >
          <BoxTrending>
            <RowSpace>
              <TitleTrending># Trends</TitleTrending>
              <SearchContainer>
                <SearchTrending
                  placeholder="Pesquise aqui..."
                  value={searchTrending}
                  onChangeText={setSearchTrending}
                />
                <ButtonSearchTrending onPress={() => searchTweets(searchTrending)}>
                  <FontAwesome name="search" size={24} color="#525252" />
                </ButtonSearchTrending>
              </SearchContainer>
            </RowSpace>
            <Row>
              {trends.map((trend: any, index: number) => {
                if (trend.select) {
                  return (
                    <ButtonTrendingSelect
                      key={index}
                      onPress={() => tweetsByTopic(trend.text, index)}
                    >
                      <TextTrendingSelect>
                        {trend.text}
                      </TextTrendingSelect>
                    </ButtonTrendingSelect>
                  )
                } else {
                  return (
                    <ButtonTrending
                      key={index}
                      onPress={() => tweetsByTopic(trend.text, index)}
                    >
                      <TextTrending>{trend.text}</TextTrending>
                    </ButtonTrending>
                  )
                }
              })}
            </Row>
          </BoxTrending>

          <BoxComments>
            <TitleComments>Comentários</TitleComments>
            {tweets.map((tweet:any, index: number) => (
              <ContainerAny key={tweet.id}>
                <Comment>
                  <UserProfile />
                  <Column>
                    <UserName>@leandro-wrf</UserName>
                    <CommentText>
                      {tweet.text}
                    </CommentText>
                  </Column>
                </Comment>

                <CommentHeart
                  onPress={() => handleHeart(index)}
                >
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={tweet.heart ? '#ff0000': '#525252' } />
                </CommentHeart>
              </ContainerAny>
            ))}
          </BoxComments>
        </Scroll>
      </Content>
    </Container>
  )
}

export default Trending
