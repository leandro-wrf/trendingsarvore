import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'

import Head from '../../components/Head'

import {
  Container,
  Content,
  ContainerScroll,
  BookTitleIndicator,
  TitleLibrary,
  BooksIndicator,
  BookImage,
  LibraryScroll,
  LibraryContainer,
  LibraryImage,
  LibraryTitle,
  LibraryDescription,
  LibraryCategories,
  Categories,
  ButtonFavorite,
  Column
} from './styled'
import book from '../../assets/shirleyjackson.png'
import data from '../../service/DATA'

const Home = () => {
  const [books, setBooks]: any = useState(data)

  function handleFavorite(heart: number) {
    const newArray = books.map((book:any, index:number) => {
    let value;

    if(heart === index) {
      value = 1;
    } else if(book.heart === 1) {
      value = 1;
    } else {
      value = 0
    }

    if(heart === index) {
      if(book.heart === 1) {
        value = 0;
      }
    } 

      return {
        id: book.id,
        title: book.title,
        description: book.description,
        heart: value
      }
    })

    setBooks(newArray)
  } 

  return (
    <Container>
      <Head />

      <Content>
        <ContainerScroll>
          <BookTitleIndicator>
            Livros parecidos com Sthepen King
          </BookTitleIndicator>

          <BooksIndicator
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <BookImage source={book} />
            <BookImage source={book} />
            <BookImage source={book} />
            <BookImage source={book} />
            <BookImage source={book} />
          </BooksIndicator>
        </ContainerScroll>

        <TitleLibrary>
          Biblioteca
        </TitleLibrary>
          
        <LibraryScroll
          showsVerticalScrollIndicator={false}
        >
          {books.map((book: any, index: number) => (
            <LibraryContainer key={book.id}>
              <LibraryImage source={require('../../assets/shirleyjackson.png')} />
              <Column>
                <LibraryTitle>{book.title}</LibraryTitle>
                <LibraryDescription
                  numberOfLines={2}
                >
                  {book.description}
                </LibraryDescription>

                <LibraryCategories>
                  <Categories>
                    Terror
                  </Categories>

                  <Categories>
                    Psicologico
                  </Categories>
                </LibraryCategories>
              </Column>
              <ButtonFavorite
                onPress={() => handleFavorite(index)}
              >
                <FontAwesome
                  name="heart"
                  size={26}
                  color={book.heart ? '#ff0000' : '#525252'}
                />
              </ButtonFavorite>
            </LibraryContainer>
          ))}
        </LibraryScroll>
      </Content>
    </Container>
  )
}

export default Home
