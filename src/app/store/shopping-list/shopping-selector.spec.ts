import { AppState } from "..";
import { getIngredients } from "./shopping-list.reducer";

describe('Ingredients Selector', () => {
    it('returns the featureNameplace.array of a state object', () => {
      const state: AppState = {
        shoppingList: {
            ingredients:[{name:'tomato',amount:10}]
        }
      };
      const result = getIngredients(state);
      expect(result[0].name).toEqual('tomato');
    });
  });