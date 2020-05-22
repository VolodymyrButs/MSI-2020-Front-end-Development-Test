export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAV':
            return [...state, action.item]

        case 'DEL_FAV':
            return state.filter((item) => item.id !== action.item.id)

        default:
            return state
    }
}
