import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule,
  MatToolbar, MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UEditorModule} from "ngx-ueditor";

@NgModule({
  imports: [
    MatButtonModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    UEditorModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    UEditorModule,
    MatExpansionModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  declarations: []
})
export class MyCommonModule { }
