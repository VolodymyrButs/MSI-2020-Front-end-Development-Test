import React from 'react'
import styled from 'styled-components'

import { display } from '../constant'
import { FavouriteTitle } from './favList'

const FavButton = styled.button`
    height: 28px;
    width: 28px;
    background: #333;
    border-radius: 50%;
    border: 0;
    margin-right: 10px;
    padding: 0;
    :focus {
        outline: none;
    }
    &::before {
        display: block;
        content: '';
        position: absolute;
        top: ${(props) => (props.open ? '13px' : '10px')};
        width: 14px;
        height: 2px;
        background-color: #fff;
        transform: translate(50%)
            rotate(${(props) => (props.open ? '-45deg' : '0')});
    }
    &::after {
        display: block;
        content: '';
        position: absolute;
        top: ${(props) => (props.open ? '13px' : '16px')};
        width: 14px;
        height: 2px;
        background-color: #fff;

        transform: translate(50%)
            rotate(${(props) => (props.open ? '45deg' : '0')});
    }
`
const FavButtonWrapper = styled.div`
    display: none;
    @media (max-width: ${display.tablet}px) {
        z-index: 2;
        display: flex;
        position: absolute;
        top: 40px;
        right: 40px;
    }
    @media (max-width: ${display.mobile}px) {
        top: 20px;
        right: 20px;
    }
`

export const ToggleFav = ({ setIsFavOpen, isFavOpen }) => {
    return (
        <FavButtonWrapper>
            <FavButton
                id="but"
                open={isFavOpen}
                onClick={() => {
                    setIsFavOpen(!isFavOpen)
                }}
            />
            <FavouriteTitle htmlFor="but">Favourite</FavouriteTitle>
        </FavButtonWrapper>
    )
}
