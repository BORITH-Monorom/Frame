import { Action, Selector, State, StateContext } from "@ngxs/store";

//Define Action
export class UploadPhoto{
  static readonly type = '[Photo] Add';
  constructor(public payload: string){}
}

export class SelectPhoto{
  static readonly type = '[Photo] Select'
  constructor(public payload: string){}
}

export class ClearPhoto{
  static readonly type = '[Photo] Clear'
}

//Define State Model
export interface PhotoStateModel{
  uploadedPhotos: string[]; //List of uploaded photo (base64 URLs)
  selectedPhoto: string | null; //Selected photo
}

//Define State
@State<PhotoStateModel>({
name: 'photo',
defaults: {
  uploadedPhotos: [],
  selectedPhoto: null
}
})

export class PhotoState{
  //✅ Selector for uploaded photos
  @Selector()
  static uploadedPhotos(state: PhotoStateModel){
    return state.uploadedPhotos;
  }

  //✅ Selector for selected photo
  @Selector()
  static selectedPhoto(state: PhotoStateModel){
    return state.selectedPhoto;
  }

  @Action(UploadPhoto)
  uploadPhoto(ctx: StateContext<PhotoStateModel>, action: UploadPhoto){
    const state = ctx.getState();
    ctx.setState({
      ...state,
      uploadedPhotos: [...state.uploadedPhotos, action.payload]
    });
  }

  @Action(SelectPhoto)
  selectPhoto(ctx: StateContext<PhotoStateModel>, action: SelectPhoto){
    ctx.patchState({
      selectedPhoto: action.payload
    });
  }

  @Action(ClearPhoto)
  clearPhoto(ctx: StateContext<PhotoStateModel>, action: ClearPhoto){
    ctx.patchState({selectedPhoto: null});
  }

}
