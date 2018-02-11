import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UEditorModule} from "ngx-ueditor";
import { TopNavComponent } from './top-nav/top-nav.component';
import {CommonModule} from "@angular/common";
import {AlertModule} from "ngx-bootstrap/alert";
import { AlertCenterComponent } from './alert-center/alert-center.component';
import {ButtonModule} from "primeng/button";
import { LoadingCoverComponent } from './loading-cover/loading-cover.component';
import {ChartModule} from "primeng/chart";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
    MatPaginatorModule,
    ButtonModule,
    ChartModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  declarations: [TopNavComponent, AlertCenterComponent, LoadingCoverComponent],
  exports: [
    // CommonModule,
    TopNavComponent,
    AlertCenterComponent,
    LoadingCoverComponent,

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
    MatPaginatorModule,
    ButtonModule,
    ChartModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule
  ],
  providers: [
    // MessageService
  ]
})
export class MyCommonModule { }

