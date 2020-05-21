export const loadFavorite = () => {
    try {
        const serializedState = localStorage.getItem('favorite')
        if (serializedState === null) {
            return {}
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

export const saveFavorite = (favoriteJokes) => {
    try {
        const serializedState = JSON.stringify(favoriteJokes)
        localStorage.setItem('favorite', serializedState)
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    }
}
