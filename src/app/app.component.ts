import { Component,inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FrameState, LoadData } from './core/store/frame-state.state';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FileUploadComponent } from "./shared/file-upload/file-upload.component";
import { PhotoState } from './core/store/photo-state.state';
import { TemplateComponent } from "./shared/template/template.component";
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
    FileUploadComponent,
    TemplateComponent
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
  items$ :Observable<any> = inject(Store).select(FrameState.Frames)
  selectedFrame$: Observable<any> = inject(Store).select(FrameState.selectedFrame);
  selectedPhoto$: Observable<string | null> = inject(Store).select(PhotoState.selectedPhoto);
  constructor(private breakpointObserver: BreakpointObserver){}
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
    this.store.dispatch(new LoadData());
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.breakpointObserver
    .observe([Breakpoints.Handset])
    .subscribe((result) =>{
      this.stepperOrientation = result.matches ? 'vertical' : 'horizontal';
    })

  }
}
