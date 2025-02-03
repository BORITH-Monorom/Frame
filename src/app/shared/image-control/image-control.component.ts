import { Component, computed, effect, inject, Input, signal } from '@angular/core';
// import { DataState, SelectItem } from '../../core/store/frame-state.state';
import { Store } from '@ngxs/store';
import { MatButtonModule } from '@angular/material/button';
// import { CropperDialogComponent, CropperDialogResult } from '../cropper-dialog/cropper-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ClearPhoto, PhotoState } from '../../core/store/photo-state.state';

@Component({
  selector: 'app-image-control',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './image-control.component.html',
  styleUrl: './image-control.component.scss'
})
export class ImageControlComponent {

  private store = inject(Store);
  private dialog = inject(MatDialog);

  // ✅ Store seleted item as signal
  selectedFrame$ = signal<any | null>(null);
  selectedPhoto$ = signal<string | null>(null);
  // croppedImage = signal<CropperDialogResult | undefined>(undefined);


  constructor(){
    effect(() =>{
      this.store.select(DataState.selectedItem).subscribe((item) =>{
        this.selectedFrame$.set(item);
      })

      this.store.select(PhotoState.selectedPhoto).subscribe((photo) =>{
        this.selectedPhoto$.set(photo);
      })
    })
  }

  // ✅ Automatically get selected
  FrameBorder = computed(() => this.selectedFrame$()?.image ?? '')

  fileSelected(event: any){
    const file = event.target.files[0];
    console.log(file, "file")
  }
  imageSrc = computed(() =>{
    if(this.selectedPhoto$()){
      return this.selectedPhoto$();
    }else{
      return null
    }
  })

  clearSelection(){
    this.store.dispatch(new ClearPhoto());
  }


  // imageSrc = computed(() => {
  //   if(this.croppedImage()){
  //     return this.croppedImage()?.imageUrl
  //   }else{
  //     return null
  //   }
  // });

  // fileSelected(event: any){
  //   const file = event.target.files[0];
  //   if(file){
  //     const dialogRef = this.dialog.open(CropperDialogComponent, {
  //       data: {
  //         image: file,
  //         frame: this.FrameBorder(),
  //         width: this.imageWidth(),
  //         height: this.imageHeight(),
  //       },
  //       width: '1000px',
  //     })

  //     dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) =>{
  //       this.croppedImage.set(result);
  //     })
  //   }
  // }
}
