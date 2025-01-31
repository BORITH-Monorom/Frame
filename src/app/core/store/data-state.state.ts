import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { FakeDataService } from "../services/fake.data.service";
import { Action, Selector, State, StateContext } from "@ngxs/store";

//Define actions
export class LoadData{
  static readonly type = '[Data] Load Data';
}
export class DeleteItem{
  static readonly type =  '[Data] Delete Item';
  constructor(public id: number){} //Pass the ID of the item to delete
}

export class SelectItem{
  static readonly type = '[Data] Select Item';
  constructor(public id: number){} //Pass the ID of the item to select
}

export class UnselectItem{
  static readonly type = '[Data] Unselect Item';
}


//define the state model
export interface DataStateModel{
  items: {
    id:number;
    name:string;
    description:string;
    image: any;
  }[];
  selectedItemId: number | null;
}

// Initial state
const defaultState: DataStateModel = {
  items: [],
  selectedItemId: null,
};

@State<DataStateModel>({
  name: 'data',
  defaults: defaultState,
})

@Injectable()
export class DataState {
  constructor(private FakeDataService: FakeDataService) {}

  @Selector()
  static items(state: DataStateModel){
    return state.items;
  }

  @Selector()
  static selectedItem(state: DataStateModel){
    return state.items.find((item) => item.id === state.selectedItemId) || null;
  }

  @Selector()
  static unselectItem(state: DataStateModel){
    return state.selectedItemId === null;
  }

  @Action(LoadData)
  loadData(ctx: StateContext<DataStateModel>){
    const state = ctx.getState();
    const data = this.FakeDataService.getData();
    ctx.setState({
      ...state,
      items: data,
    })
  }

  @Action(DeleteItem)
  deleteItem(ctx: StateContext<DataStateModel>, action: DeleteItem){
    const state = ctx.getState();
    const filteredItems = state.items.filter((item) => item.id !== action.id);
    ctx.setState({
      ...state,
      items: filteredItems,
    })
  }

  @Action(SelectItem)
  selectItem(ctx: StateContext<DataStateModel>, action: SelectItem){
    ctx.patchState({selectedItemId: action.id });
  }

  @Action(UnselectItem)
  unselectItem(ctx: StateContext<DataStateModel>){
    ctx.patchState({selectedItemId: null});
  }




}
