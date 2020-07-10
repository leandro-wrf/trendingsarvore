import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

import Head from '../../components/Head'

import {
  Container,
  Content,
  Scroll,
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

const Favorites = () => {
  return (
    <Container>
      <Head />

      <Content>
        <Scroll
          showsVerticalScrollIndicator={false}
        >
          <LibraryContainer>
            <LibraryImage source={book} />
            <Column>
              <LibraryTitle>Shirley Jackson</LibraryTitle>
              <LibraryDescription>Qualquer coisa</LibraryDescription>
              <LibraryCategories>
                <Categories>Terror</Categories>
                <Categories>Terror</Categories>
              </LibraryCategories>
            </Column>
            <ButtonFavorite>
              <FontAwesome name="heart" size={26} color="#ff0000" />
            </ButtonFavorite>
          </LibraryContainer>
        </Scroll>
      </Content>
    </Container>
  )
}

export default Favorites
