export const favoriteJokesReducer = (favoriteJokes, action) => {
    switch (action.type) {
        case 'ADD_FAV':
            return { ...favoriteJokes, [action.item.id]: action.item }

        case 'DEL_FAV':
            let { [action.item.id]: omit, ...newState } = favoriteJokes
            return newState

        default:
            return favoriteJokes
    }
}
