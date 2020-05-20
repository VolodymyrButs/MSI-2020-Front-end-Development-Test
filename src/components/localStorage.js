export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("favorite");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("favorite", serializedState);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
