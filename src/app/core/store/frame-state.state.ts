import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { FakeDataService } from "../services/fake.data.service";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Frame } from "../models/frame.model";

//Define actions
export class LoadData{
  static readonly type = '[Data] Load Data';
}
export class DeleteFrame{
  static readonly type =  '[Data] Delete Frame';
  constructor(public id: number){} //Pass the ID of the Frame to delete
}

export class SelectFrame{
  static readonly type = '[Data] Select Frame';
  constructor(public id: number){} //Pass the ID of the Frame to select
}

export class UnselectFrame{
  static readonly type = '[Data] Unselect Frame';
}


//define the state model
export interface FrameStateModel{
  Frames: Frame[];
  selectedFrameId: number | null;
}

// Initial state
const defaultState: FrameStateModel = {
  Frames: [],
  selectedFrameId: null,
};

@State<FrameStateModel>({
  name: 'data',
  defaults: defaultState,
})

@Injectable()
export class FrameState {
  constructor(private FakeDataService: FakeDataService) {}

  @Selector()
  static Frames(state: FrameStateModel){
    console.log(state, "frame state");
    return state.Frames;
  }

  @Selector()
  static selectedFrame(state: FrameStateModel){
    console.log(state, "state Frame");
    return state.Frames.find((Frame) => Frame.id === state.selectedFrameId) || null;
  }

  @Selector()
  static unselectFrame(state: FrameStateModel){
    return state.selectedFrameId === null;
  }

  @Action(LoadData)
  loadData(ctx: StateContext<FrameStateModel>){
    console.log('LoadData Action triggered');
    const state = ctx.getState();
    console.log('Current state:', state);
    const data = this.FakeDataService.getData();
    console.log('Data retrieved:', data);
    ctx.setState({
      ...state,
      Frames: data,
    });
    console.log('New state:', ctx.getState());
  }

  @Action(DeleteFrame)
  deleteFrame(ctx: StateContext<FrameStateModel>, action: DeleteFrame){
    const state = ctx.getState();
    const filteredFrames = state.Frames.filter((Frame) => Frame.id !== action.id);
    ctx.setState({
      ...state,
      Frames: filteredFrames,
    })
  }

  @Action(SelectFrame)
  selectFrame(ctx: StateContext<FrameStateModel>, action: SelectFrame){
    ctx.patchState({selectedFrameId: action.id });
  }

  @Action(UnselectFrame)
  unselectFrame(ctx: StateContext<FrameStateModel>){
    ctx.patchState({selectedFrameId: null});
  }




}
