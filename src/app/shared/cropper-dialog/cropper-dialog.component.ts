import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
export type CropperDialogData ={
  image: File;
  width: number;
  height: number;
  frame: any;
}
export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
}
@Component({
  selector: 'app-cropper-dialog',
  imports: [CommonModule, MatDialogModule, ImageCropperComponent, MatButtonModule,MatIconModule],
  templateUrl: './cropper-dialog.component.html',
  styleUrl: './cropper-dialog.component.scss'
})
export class CropperDialogComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  data: CropperDialogData = inject(MAT_DIALOG_DATA);

  result = signal<CropperDialogResult | undefined>(undefined);
  imageCropped(event: ImageCroppedEvent){
    const {blob, objectUrl} = event;
    if (blob && objectUrl){
      this.result.set({blob, imageUrl: objectUrl});
    }
  }
}
