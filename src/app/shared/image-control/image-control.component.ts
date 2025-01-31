import { Component, computed, effect, inject, Input, signal } from '@angular/core';
import { DataState, SelectItem } from '../../core/store/data-state.state';
import { Store } from '@ngxs/store';
import { MatButtonModule } from '@angular/material/button';
import { CropperDialogComponent, CropperDialogResult } from '../cropper-dialog/cropper-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

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
  select$ = signal<any | null>(null); //Store seleted item as signal
  croppedImage = signal<CropperDialogResult | undefined>(undefined);
  constructor(){
    effect(() =>{
      this.store.select(DataState.selectedItem).subscribe((item) =>{
        this.select$.set(item);
      })
    })
  }
  ngOnChanges(): void {

  }
  imageWidth = signal(0);
  @Input() set width(val: number){
    this.imageWidth = signal(val);
  }

  imageHeight = signal(0);
  @Input() set height(val: number){
    this.imageHeight = signal(val);
  }

  placeholder = computed(() => this.select$()?.image ?? '')


  imageSource = computed(() =>{
    if(this.croppedImage()){
      return this.croppedImage()?.imageUrl;
    }
    return this.placeholder();
  })

  fileSelected(event: any){
    const file = event.target.files[0];
    if(file){
      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: {
          image: file,
          frame: this.placeholder(),
          width: this.imageWidth(),
          height: this.imageHeight(),
        },
        width: '1000px',
      })

      dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result) =>{
        this.croppedImage.set(result);
        console.log(this.croppedImage.set(result));
      })
    }
  }
}
