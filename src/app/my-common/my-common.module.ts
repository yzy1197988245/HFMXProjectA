import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbar, MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UEditorModule} from "ngx-ueditor";
import { TopNavComponent } from './top-nav/top-nav.component';
import {CommonModule} from "@angular/common";
import {MessageService} from "../services/message.service";
import {AlertModule} from "ngx-bootstrap/alert";
import { AlertCenterComponent } from './alert-center/alert-center.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    UEditorModule,

    MatButtonModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AlertModule,
    MatProgressBarModule,
  ],
  declarations: [TopNavComponent, AlertCenterComponent],
  exports: [
    // CommonModule,
    TopNavComponent,
    AlertCenterComponent,

    FormsModule,
    ReactiveFormsModule,
    UEditorModule,

    MatButtonModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AlertModule,
    MatProgressBarModule
  ],
  providers: [
    // MessageService
  ]
})
export class MyCommonModule { }

