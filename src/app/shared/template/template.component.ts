import { Component, inject } from '@angular/core';
import { FrameState, SelectFrame } from '../../core/store/frame-state.state';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template',
  imports: [CommonModule,MatCardModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent {
  private store = inject(Store)

  items$ :Observable<any> = inject(Store).select(FrameState.Frames)
  selectedFrame$ : Observable<any> = inject(Store).select(FrameState.selectedFrame)

  selectFrame(id: number){
    this.store.dispatch(new SelectFrame(id));
  }
}
