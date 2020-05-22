import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Heart } from '../assets/heart.svg'
import { ReactComponent as Message } from '../assets/message.svg'
import { ReactComponent as Link } from '../assets/link.svg'
import { display } from '../constant'

const JokeWrapper = styled.div`
    position: relative;
    width: 100%;
    background-color: ${(props) => (props.fav === 1 ? 'white' : '#f8f8f8')};
    border-radius: 20px;
    box-sizing: border-box;
    padding: ${(props) =>
        props.fav ? '47px 20px 20px 80px' : '67px 40px 45px 100px'};
    margin: 10px 0px;
    @media (max-width: ${display.mobile}px) {
        padding: ${(props) =>
            props.fav ? '47px 20px 20px 60px' : '67px 40px 45px 80px'};
    }
`

const HeartStyled = styled(Heart)`
    position: absolute;
    right: ${(props) => (props.fav ? '20px' : '40px')};
    top: ${(props) => (props.fav ? '20px' : '40px')};
    width: 22px;
    height: 20px;
    fill: ${(props) => (props.isfavorite ? '#ff6767' : '#f8f8f8')};
`
const MessageIconWrapper = styled.div`
    position: absolute;
    left: ${(props) => (props.fav ? '20px' : '40px')};
    top: ${(props) => (props.fav ? '47px' : '67px')};
    @media (max-width: ${display.mobile}px) {
        left: ${(props) => (props.fav ? '10px' : '20px')};
    }
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${(props) => (props.fav ? ' #f8f8f8' : '#fff')};
`

const MessageIcon = styled(Message)`
    width: 20px;
    height: 20px;
    transform: translate(50%, 50%);
`
const JokeBody = styled.p`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
`
const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`
const JokeTime = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    color: #ababab;
`
const JokeCategori = styled.p`
    background: #ffffff;
    border-radius: 6px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 20px;
    color: #333333;
`
const JokeId = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #ababab;
    a {
        color: #8ea7ff;
    }
`
const LinkStyled = styled(Link)`
    margin-left: 5px;
`
export const JokeComponent = ({ item, isfavorite, dispatch, small }) => {
    const delFromState = (item) => {
        dispatch({ type: 'DEL_FAV', item })
    }
    const addToState = (item) => {
        dispatch({ type: 'ADD_FAV', item })
    }
    return (
        <JokeWrapper fav={small ? 1 : 0}>
            <JokeId>
                ID:
                <a href={item.url} target="blank">
                    {item.id} <LinkStyled />
                </a>
            </JokeId>
            <JokeBody>{item.value}</JokeBody>
            <BottomContainer>
                <JokeTime>
                    Last update:{' '}
                    {Math.round(
                        (Date.now() - Date.parse(item.updated_at)) / 36e5
                    )}{' '}
                    hours ago
                </JokeTime>
                {item.categories[0] ? (
                    <JokeCategori>{item.categories}</JokeCategori>
                ) : (
                    <div></div>
                )}
            </BottomContainer>
            {isfavorite ? (
                <HeartStyled
                    fav={small ? 1 : 0}
                    isfavorite={isfavorite ? 1 : 0}
                    onClick={() => {
                        delFromState(item)
                    }}
                />
            ) : (
                <HeartStyled
                    fav={small ? 1 : 0}
                    isfavorite={isfavorite ? 1 : 0}
                    onClick={() => {
                        addToState(item)
                    }}
                />
            )}
            <MessageIconWrapper fav={small ? 1 : 0}>
                <MessageIcon />
            </MessageIconWrapper>
        </JokeWrapper>
    )
}
