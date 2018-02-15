import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {UEditorModule} from "ngx-ueditor";
import { TopNavComponent } from './top-nav/top-nav.component';

import { AlertCenterComponent } from './alert-center/alert-center.component';
import { LoadingCoverComponent } from './loading-cover/loading-cover.component';
import { SourceViewerComponent } from './source-viewer/source-viewer.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';

import {ChartModule} from "primeng/chart";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FileUploadModule} from "primeng/fileupload";
import {BlockUIModule} from "primeng/blockui";
import {SidebarModule} from "primeng/sidebar";
import {CheckboxModule} from "primeng/checkbox";

import {PaginationModule} from "ngx-bootstrap/pagination";
import {AlertModule} from "ngx-bootstrap/alert";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";

import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    UEditorModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AlertModule,
    MatProgressBarModule,
    ChartModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
    PaginationModule,
    FileUploadModule,
    ProgressbarModule,
    BlockUIModule,
    SidebarModule,
    CheckboxModule,
    PdfViewerModule
  ],
  declarations: [TopNavComponent, AlertCenterComponent, LoadingCoverComponent, SourceViewerComponent, FileUploaderComponent, FileSelectorComponent],
  entryComponents: [FileSelectorComponent],
  exports: [
    TopNavComponent,
    AlertCenterComponent,
    LoadingCoverComponent,
    FileUploaderComponent,
    FileSelectorComponent,
    SourceViewerComponent,

    FormsModule,
    ReactiveFormsModule,
    UEditorModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AlertModule,
    MatProgressBarModule,
    ChartModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
    PaginationModule,
    FileUploadModule,
    ProgressbarModule,
    BlockUIModule,
    SidebarModule,
    CheckboxModule,
    PdfViewerModule,
  ],
  providers: [
    // MessageService
  ]
})
export class MyCommonModule { }

