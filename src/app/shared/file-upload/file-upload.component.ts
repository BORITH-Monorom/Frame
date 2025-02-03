import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { PhotoState, SelectPhoto, UploadPhoto } from '../../core/store/photo-state.state';
import { Store } from '@ngxs/store';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule,MatIconModule,ImageCropperComponent,MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  private store = inject(Store)
  imageChangedEvent: any = '';
  croppedImage = signal<string | null>(null)

  selectedPhoto$ = signal<string | null>(null)

  constructor(){
    effect(() =>{
      this.store.select(PhotoState.selectedPhoto).subscribe((photo) => {
        this.selectedPhoto$.set(photo)
      })
    })
  }

  showPreview = computed(() => this.selectedPhoto$() !== null);
  selectedPhoto = computed(() => this.selectedPhoto$())

  onDrop(event: DragEvent){
    
  }
  onDragOver(event: DragEvent){

  }
  onDragLeave(event: DragEvent){

  }

  onFileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) =>{
        const base64Image = e.target?.result as string; //Converts the file to a data URL
        this.selectedPhoto$.set(base64Image);
        this.store.dispatch(new UploadPhoto(base64Image));
        this.store.dispatch(new SelectPhoto(base64Image));
      };
      reader.readAsDataURL(file); //Converts the file to a data URL
    }
  }

}
