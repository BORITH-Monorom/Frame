import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataState, DataStateModel, DeleteItem, LoadData, SelectItem, UnselectItem } from './core/store/data-state.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ImageControlComponent } from "./shared/image-control/image-control.component";
@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    ImageCropperComponent,
    ImageControlComponent,
    
],
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: {displayDefaultIndicatorType: false},
      },
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedFile: File | null = null; //Holds the selected file
  previewUrl: string | ArrayBuffer | null = null; //URL of the preview image
  isFileUploaded: boolean= false; //Indicates if a file has been uploaded
  isDragging: boolean = false; //Indicates if a file is being dragged

  //Cropping Properties
  imageChangedEvent: any = '';
  croppedImage: string | null = null;
  showCropper: boolean = false;

  items$: Observable<any[]> = inject(Store).select(DataState.items);
  selectedItem$: Observable<any> = inject(Store).select(DataState.selectedItem);
  unselectItem$: Observable<any> = inject(Store).select(DataState.unselectItem);
  constructor(private breakpointObserver: BreakpointObserver){
this.store.dispatch(new LoadData());
  }
  private store = inject(Store);
  private _formBuilder = inject(FormBuilder);

  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.breakpointObserver
    .observe([Breakpoints.Handset])
    .subscribe((result) =>{
      this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
    })
  }


  onImageCropped(event: ImageCroppedEvent): void {
      this.croppedImage = event.base64 || null;

    this.previewUrl = this.croppedImage;
    this.isFileUploaded = true;
    this.showCropper = false;
  }
  onImageLoaded(): void{
    console.log('Image loaded for cropping');
  }

  onCropperReady(): void{
    console.log('Cropping ready');
  }

  onImageLoadFailed(): void{
    console.log('Image load failed');
  }

  deleteItem(id: number){
    this.store.dispatch(new DeleteItem(id));
  }

  selectItem(id: number){
    this.store.dispatch(new SelectItem(id));
  }

  unselectItem(){
    this.store.dispatch(new UnselectItem());
  }

onFileSelected(event: any): void{
  const file = event.target.files[0];
  if(file){
    this.imageChangedEvent = event;
    this.selectedFile = file;
    this.isFileUploaded = true; //Next button is enabled
    // this.previewImage(file);
    this.showCropper = true; //Show cropper
  }
}
  onDrop(event: DragEvent){
    console.log(event,'drop');
    event.preventDefault();
    this.isDragging = false;
    if(event.dataTransfer && event.dataTransfer.files.length > 0){
      const file = event.dataTransfer.files[0];
      this.imageChangedEvent = { target: { files: [file] } };
      this.selectedFile = file;
      // this.previewImage(this.selectedFile);
      this.isFileUploaded = true;
      this.showCropper = true;
    }
  }
  previewImage(file: File){
    const reader = new FileReader(); //Creates a new FileReader object
    reader.onload = (e) =>{
      this.previewUrl = e.target?.result ?? null //
    }
    reader.readAsDataURL(file); //Converts the file to a data URL
  }
  onDragOver(event: DragEvent){
    console.log(event,'drag over');
    event.preventDefault();
    this.isDragging = true;
  }
  onDragLeave(event: DragEvent){
    event.preventDefault();
    this.isDragging = false;
}

}
