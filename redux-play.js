const redux = require('redux');
const createStore = redux.createStore;

const initialState = [];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   case 'SET_INGREDIENTS': return action.ingredients;
   case 'ADD_INGREDIENT':
    let ingredients = [...state];
    const ingredient = ingredients.find(i => i.label === action.ingredientName);
    ingredient.units += 1;

    return [...ingredients];
   case 'REMOVE_INGREDIENT':
    let ings = [...state];
    const ingt = ings.find(i => i.label === action.ingredientName);

    if (ingt.unit <= 0) { return state; }

    ingt.units -= 1;

    return [...ings];
   default: return state;
  }
};

const store = createStore(rootReducer);

store.subscribe(()=> { console.log('New State', store.getState()); });

store.dispatch({type: 'SET_INGREDIENTS', ingredients: [{label: 'cheese', units: 0}, {label: 'meat', units: 0}, {label: 'salad', units: 0}]});

store.dispatch({type: 'ADD_INGREDIENT', ingredientName: 'meat'});
store.dispatch({type: 'ADD_INGREDIENT', ingredientName: 'salad'});
store.dispatch({type: 'ADD_INGREDIENT', ingredientName: 'cheese'});
store.dispatch({type: 'ADD_INGREDIENT', ingredientName: 'meat'});
store.dispatch({type: 'ADD_INGREDIENT', ingredientName: 'meat'});
store.dispatch({type: 'ADD_INGREDIENT', ingredientName: 'meat'});
store.dispatch({type: 'REMOVE_INGREDIENT', ingredientName: 'salad'});
store.dispatch({type: 'REMOVE_INGREDIENT', ingredientName: 'meat'});
store.dispatch({type: 'REMOVE_INGREDIENT', ingredientName: 'meat'});
store.dispatch({type: 'REMOVE_INGREDIENT', ingredientName: 'cheese'});
