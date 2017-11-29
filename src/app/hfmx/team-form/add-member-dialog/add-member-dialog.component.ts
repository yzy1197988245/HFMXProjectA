import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {

  xsOptions = [];
  searchTask;
  memberForm: FormGroup;
  userInput: FormControl;

  constructor(
    private dialogRef: MatDialogRef<AddMemberDialogComponent>,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.memberForm = this.formBuilder.group({
      xm: [ null, [ Validators.required ] ],
      xh: [ null, [ Validators.required ] ],
      phone: [ null, [ Validators.required ] ],
      bj: [null, [Validators.required] ],
    });
    this.userInput = new FormControl(null, [ Validators.required ]);
  }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

  commit() {
    this.dialogRef.close(this.memberForm.value);
  }

  memberString(member):string {
    return member.xh + ',' + member.xm + ',' + member.bj;
  }

  searchXs(searchText) {
    clearTimeout(this.searchTask);
    this.searchTask = setTimeout(() => {
      this.httpService.xsOptions(searchText).then(response => {
        this.xsOptions = response.data;
      });
    }, 250);
  }

  studentSelected(student) {
    let studentInfos = student.split(',');
    this.memberForm.controls['xh'].setValue(studentInfos[0]);
    this.memberForm.controls['xm'].setValue(studentInfos[1]);
    this.memberForm.controls['bj'].setValue(studentInfos[2]);
  }

}
