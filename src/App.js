import React, { useEffect, useState, useReducer } from 'react'
import styled, { css } from 'styled-components'

import { saveState, loadState } from './components/localStorage'
import { JokeComponent } from './components/JokeComponent'
import { reducer } from './components/reducer'
import { display } from './constant'

const isActive = {
    true: css`
        color: #333333;
        background: #f8f8f8;
        border: 2px solid #f8f8f8;
        box-sizing: border-box;
        border-radius: 6px;
    `,
    false: css`
        color: #ababab;
        background: transparent;
        border: 2px solid #f8f8f8;
        box-sizing: border-box;
        border-radius: 6px;
    `,
}
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
`

const PageContent = styled.div`
    display: flex;
    min-width: 100%;
    max-width: 1440px;
    background-color: #fff;
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

const RadioItem = styled.div`
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
const CategoriesButton = styled.button`
    margin: 2px 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    :focus {
        outline: none;
    }
    ${(props) => isActive[props.active]}
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
    color: #ababab;
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
    color: #ffffff;
    :focus {
        outline: none;
    }
`
const FavList = styled.aside`
    width: 100%;
    @media (max-width: ${display.tablet}px) {
        width: 60%;
        position: absolute;
        top: 0;
        right: 0;
    }
    @media (max-width: ${display.mobile}px) {
        width: 100%;
    }
    min-height: 100%;
    background: #f8f8f8;
    box-sizing: border-box;
    padding: 88px 40px;
`
const FavListWrapper = styled.div`
    width: 33.41%;
    @media (max-width: ${display.tablet}px) {
        display: ${(props) => (props.open ? 'block' : 'none')};
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
`
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
`
const FavouriteTitle = styled.label`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #ababab;
    margin: 0;
    margin-bottom: 20px;
`

const App = () => {
    const [joke, setJoke] = useState()
    const [categoriesArray, setCategoriesArray] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [inputValue, setInputValue] = useState()
    const [radioValue, setRadioValue] = useState()
    const [isFavOpen, setIsFavOpen] = useState(false)
    console.log(isFavOpen)
    const [state, dispatch] = useReducer(reducer, loadState())
    useEffect(() => {
        saveState(state)
    }, [state])
    useEffect(() => {
        loadState()
        fetch(' https://api.chucknorris.io/jokes/categories')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setCategoriesArray(data)
            })
    }, [])
    const getRandomJoke = () =>
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setJoke([data])
            })
    const getCategoriJoke = () =>
        fetch(
            `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setJoke([data])
            })

    const getTextJoke = () =>
        fetch(`https://api.chucknorris.io/jokes/search?query=${inputValue}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setJoke(data.result)
            })

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value)
    }
    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const getJoke = () => {
        if (radioValue === 'categori') {
            getCategoriJoke()
        } else if (radioValue === 'text') {
            getTextJoke()
        } else {
            getRandomJoke()
        }
    }
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
                                name="type"
                                type="radio"
                                id="r1"
                            ></input>
                            <label htmlFor="r1">Random</label>
                        </RadioItem>
                        <RadioItem>
                            <input
                                name="type"
                                onChange={() => {
                                    setRadioValue('categori')
                                }}
                                type="radio"
                                id="r2"
                            ></input>
                            <label htmlFor="r2">From Categories</label>
                        </RadioItem>
                        {radioValue === 'categori'
                            ? categoriesArray.map((categori, index) => {
                                  const active = selectedCategory === categori
                                  return (
                                      <CategoriesButton
                                          active={active}
                                          onClick={handleSelectCategory}
                                          value={categori}
                                          key={index}
                                      >
                                          {categori.charAt(0).toUpperCase() +
                                              categori.slice(1)}
                                      </CategoriesButton>
                                  )
                              })
                            : null}

                        <RadioItem>
                            <input
                                name="type"
                                onChange={() => {
                                    setRadioValue('text')
                                }}
                                type="radio"
                                id="r3"
                            ></input>
                            <label htmlFor="r3">Search</label>
                        </RadioItem>
                        {radioValue === 'text' ? (
                            <div>
                                <TextInput
                                    placeholder="Free text search..."
                                    onChange={handleInput}
                                ></TextInput>
                            </div>
                        ) : null}
                        <GetJoke onClick={getJoke}>Get a joke</GetJoke>
                    </JokeSelector>
                    {joke && (
                        <>
                            {joke.slice(0, 9).map((item) => {
                                const isfavorite = state
                                    .map((joke) => joke.id === item.id)
                                    .includes(true)
                                return (
                                    <JokeComponent
                                        key={item.id}
                                        item={item}
                                        isfavorite={isfavorite}
                                        dispatch={dispatch}
                                    />
                                )
                            })}
                        </>
                    )}
                </MainContainer>
                <FavButtonWrapper>
                    <FavButton
                        id="but"
                        open={isFavOpen}
                        onClick={() => {
                            setIsFavOpen(!isFavOpen)
                        }}
                    />{' '}
                    <FavouriteTitle htmlFor="but">Favourite</FavouriteTitle>
                </FavButtonWrapper>
                <FavListWrapper open={isFavOpen}>
                    <FavList>
                        {!isFavOpen ? (
                            <FavouriteTitle>Favourite</FavouriteTitle>
                        ) : (
                            <FavouriteTitle>{''}</FavouriteTitle>
                        )}
                        {state.map((item, index) => {
                            return (
                                <JokeComponent
                                    small
                                    key={item.id}
                                    item={item}
                                    isfavorite={true}
                                    dispatch={dispatch}
                                />
                            )
                        })}
                    </FavList>
                </FavListWrapper>
            </PageContent>
        </Wrapper>
    )
}

export default App
