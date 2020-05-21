import React from 'react'
import styled from 'styled-components'

import { display } from '../constant'
import { Joke } from './Joke'

const FavListBody = styled.aside`
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    box-sizing: border-box;
    padding: 40px;
    @media (max-width: ${display.tablet}px) {
        width: 60%;
        position: absolute;
        top: 0;
        right: 0;
        overflow: scroll;
        padding: 88px 20px;
    }
    @media (max-width: ${display.mobile}px) {
        width: 100%;
    }
`
const FavListWrapper = styled.label`
    width: 33.41%;
    @media (max-width: ${display.tablet}px) {
        overflow: none;
        display: ${(props) => (props.open ? 'block' : 'none')};
        width: 100%;
        min-height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
`
export const FavouriteTitle = styled.label`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #ababab;
    margin: 0;
    margin-bottom: 20px;
`

export const FavList = ({ isFavOpen, favoriteJokes, dispatch }) => {
    return (
        <FavListWrapper open={isFavOpen}>
            <FavListBody>
                <FavouriteTitle>{!isFavOpen ? 'Favourite' : ''}</FavouriteTitle>
                {Object.keys(favoriteJokes).map((id) => {
                    return (
                        <Joke
                            small={'true'}
                            key={favoriteJokes[id].id}
                            item={favoriteJokes[id]}
                            isJokeFavorite={'true'}
                            dispatch={dispatch}
                        />
                    )
                })}
            </FavListBody>
        </FavListWrapper>
    )
}
