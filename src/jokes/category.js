import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

const isActive = {
    true: css`
        color: #333333;
        background: #f8f8f8;
    `,
    false: css`
        color: #ababab;
        background: transparent;
    `,
}

const CategoriesButton = styled.button`
    margin: 2px 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: 2px solid #f8f8f8;
    box-sizing: border-box;
    border-radius: 6px;
    :focus {
        outline: none;
    }
    ${(props) => isActive[props.active]}
`

export const Category = ({ selectedCategory, setSelectedCategory }) => {
    const [categoriesArray, setCategoriesArray] = useState([])

    useEffect(() => {
        fetch(' https://api.chucknorris.io/jokes/categories')
            .then((response) => response.json())
            .then((data) => {
                setCategoriesArray(data)
            })
    }, [])
    return categoriesArray.map((category, index) => {
        const active = selectedCategory === category
        return (
            <CategoriesButton
                active={active}
                onClick={() => setSelectedCategory(category)}
                key={index}
            >
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoriesButton>
        )
    })
}
