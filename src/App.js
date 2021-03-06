import React, { useEffect, useState, useReducer } from 'react'
import styled from 'styled-components'

import { saveFavorite, loadFavorite } from './jokes/favoriteStorage'
import { Joke } from './jokes/Joke'
import { favoriteJokesReducer } from './jokes/favoriteJokesReducer'
import { display } from './constant'
import { CategoryList } from './jokes/CategoryList'
import { FavList } from './jokes/FavList'
import { ToggleFav } from './jokes/ToggleFav'
import { shuffle } from './shuffle'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
    overflow: hidden;
`

const PageContent = styled.div`
    display: flex;
    min-width: 100%;
    max-width: 1440px;
    background-color: #fff;
    overflow: hidden;
`
const MainContainer = styled.div`
    width: 66.6%;
    min-height: 100%;
    padding: 40px 140px 140px 140px;
    box-sizing: border-box;
    @media (max-width: ${display.tablet}px) {
        width: 100%;
        padding: 40px;
    }
    @media (max-width: ${display.mobile}px) {
        width: 100%;
        padding: 20px;
    }
`
const JokeSelector = styled.div``
const Title = styled.h1`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #333333;
    margin: 0;
`
const HelloBlock = styled.div`
    p {
        margin-top: 78px;
        margin-bottom: 0;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 44px;
        color: #333333;
    }
    p:last-child {
        margin-top: 0;
        margin-bottom: 43px;
        font-family: Roboto;
        font-weight: 500;
        font-size: 24px;
    }
`

const RadioItem = styled.label`
    display: flex;
    margin: 10px 0;
    input {
        width: 20px;
        height: 20px;
        :focus {
            outline: none;
        }
    }
    label {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 26px;
        color: #333333;
        padding-left: 15px;
    }
`

const TextInput = styled.input`
    width: 100%;
    border: 2px solid #333333;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 15px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #ffa28d;
    :valid {
        color: #ababab;
    }
`
const GetJokeBlock = styled.div`
    position: relative;
`
const GetJoke = styled.button`
    width: 152px;
    height: 42px;
    margin: 20px 0 40px 0;
    background: linear-gradient(92.01deg, #8ea7ff 0%, #7291ff 100%);
    border-radius: 10px;
    border-width: 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #f8f8f8;
    :focus {
        outline: none;
    }
`
const ErrorText = styled.p`
    position: absolute;
    top: 45px;
    left: 0;
    width: 152px;
    height: 22px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #ffa28d;
`
const App = () => {
    const [jokes, setJokes] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [inputValue, setInputValue] = useState('')
    const [radioValue, setRadioValue] = useState()
    const [isFavOpen, setIsFavOpen] = useState(false)
    const [wrongValue, setWrongValue] = useState('')

    useEffect(() => {
        loadFavorite()
    }, [])

    const [favoriteJokes, dispatch] = useReducer(
        favoriteJokesReducer,
        loadFavorite()
    )
    useEffect(() => {
        saveFavorite(favoriteJokes)
    }, [favoriteJokes])

    const getRandomJoke = () =>
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => response.json())
            .then((data) => {
                setJokes([data])
            })
    const getCategoryJoke = () =>
        fetch(
            `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
        )
            .then((response) => response.json())
            .then((data) => {
                setJokes([data])
            })

    const getTextJoke = () =>
        fetch(`https://api.chucknorris.io/jokes/search?query=${inputValue}`)
            .then((response) => response.json())
            .then((data) => shuffle(data.result))
            .then((data) => setJokes(data))

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const getJoke = () => {
        if (radioValue === 'category' && selectedCategory) {
            getCategoryJoke()
        } else if (radioValue === 'category' && !selectedCategory) {
            setWrongValue('Select category!')
            setTimeout(() => setWrongValue(''), 2000)
        } else if (radioValue === 'text' && inputValue.length >= 3) {
            getTextJoke()
        } else if (radioValue === 'text' && inputValue.length < 3) {
            setWrongValue('Wrong value!')
            setTimeout(() => setWrongValue(''), 2000)
        } else {
            getRandomJoke()
        }
    }

    useEffect(() => {
        document.body.style.overflow = isFavOpen ? 'hidden' : 'unset'
    }, [isFavOpen])

    return (
        <Wrapper>
            <PageContent>
                <MainContainer>
                    <Title>MSI 2020</Title>
                    <HelloBlock>
                        <p>Hey!</p>
                        <p>Let’s try to find a joke for you:</p>
                    </HelloBlock>
                    <JokeSelector>
                        <RadioItem>
                            <input
                                defaultChecked
                                onChange={() => {
                                    setRadioValue('random')
                                }}
                                name="jokeRequestType"
                                type="radio"
                            />
                            Random
                        </RadioItem>
                        <RadioItem>
                            <input
                                name="jokeRequestType"
                                onChange={() => {
                                    setRadioValue('category')
                                }}
                                type="radio"
                            />
                            From Categories
                        </RadioItem>
                        {radioValue === 'category' && (
                            <CategoryList
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        )}
                        <RadioItem>
                            <input
                                name="jokeRequestType"
                                onChange={() => {
                                    setRadioValue('text')
                                }}
                                type="radio"
                            />
                            Search
                        </RadioItem>
                        {radioValue === 'text' && (
                            <div>
                                <TextInput
                                    minLength={3}
                                    placeholder="Free text search...(min 3 symbol)"
                                    onChange={handleInput}
                                ></TextInput>
                            </div>
                        )}
                        <GetJokeBlock>
                            <GetJoke onClick={getJoke}>Get a joke!</GetJoke>
                            {wrongValue && <ErrorText>{wrongValue}</ErrorText>}
                        </GetJokeBlock>
                    </JokeSelector>
                    {jokes &&
                        jokes.slice(0, 9).map((item) => {
                            const isJokeFavorite = Boolean(
                                favoriteJokes[item.id]
                            )
                            return (
                                <Joke
                                    small={false}
                                    key={item.id}
                                    item={item}
                                    isJokeFavorite={isJokeFavorite}
                                    dispatch={dispatch}
                                />
                            )
                        })}
                </MainContainer>
                <ToggleFav isFavOpen={isFavOpen} setIsFavOpen={setIsFavOpen} />
                <FavList
                    isFavOpen={isFavOpen}
                    favoriteJokes={favoriteJokes}
                    dispatch={dispatch}
                />
            </PageContent>
        </Wrapper>
    )
}

export default App
