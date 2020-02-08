import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList: any = [];
  lastRowCount: any;
  getAllEmpDataList: any = [];
  eid: any;
  ename: any;
  eage: any;
  epno: any;
  deleteEid: any;
  editEid: any;
  EditButtonEnable: boolean = false;

  constructor(private http: HttpClient, private modalservice: NgbModal) { }

  ngOnInit() {
    this.LastRowFunction();
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.http.get('http://localhost:3000/api/v1/getAllEmployee')
    .subscribe(response => {
      this.getAllEmployeeResponse(response);
    })
  }

  LastRowFunction() {
    this.http.get('http://localhost:3000/api/v1/getLastID')
    .subscribe(response => {
      this.getLastRow(response);
    })
  }

  getAllEmployeeResponse(res) {
    this.getAllEmpDataList = res;
  }

  getLastRow(res) {
    this.lastRowCount = res.message;
    console.log('lastRowCount: '+this.lastRowCount);
    this.eid = this.lastRowCount;
  }

  EmployeeFunction(EmployeeForm: NgForm) {
    const EID = EmployeeForm.controls['eid'].value;
    const NAME = EmployeeForm.controls['ename'].value;
    const AGE = EmployeeForm.controls['eage'].value;
    const PHONE = EmployeeForm.controls['epno'].value;
    if(this.EditButtonEnable == true) {  // for Edit 
      console.log('EditButtonEnable: '+this.EditButtonEnable);
      const editEmp = {NAME, AGE, PHONE };
      console.log('editEmp: '+JSON.stringify(editEmp));
      this.http.put('http://localhost:3000/api/v1/updateSingleEmployee/'+EID, {NAME, AGE, PHONE}, httpOption)
      .subscribe(res => {
        this.LastRowFunction();
        this.clearfields();
        this.getAllEmployee(); // this function is used to show all data after submitting new data
      })
    }
    else {  // for Insert
      this.employeeList.push({
        EID: EID,
        NAME: NAME,
        AGE: AGE,
        PHONE: PHONE
      })
      this.http.post('http://localhost:3000/api/v1/postEmployee', this.employeeList, httpOption)
      .subscribe(res => {
        console.log('employeeList: '+JSON.stringify(res));
        this.LastRowFunction();
        this.clearfields();
        this.getAllEmployee(); // this function is used to show all data after submitting new data
      });
    }
    this.EditButtonEnable = false;
  }

  clearfields() {
    this.ename = '';
    this.eage = '';
    this.epno = '';
  }

  OpenLgEmployee(content1){
    this.modalservice.open(content1, { centered: true, size: 'lg' });
  }

  openDeleteModal(content, deleteid){
    this.deleteEid = deleteid;
    this.modalservice.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  deleteEmployeeInfo() {
    console.log(this.deleteEid);
    this.http.delete('http://localhost:3000/api/v1/deleteSingleEmployee/'+Number(this.deleteEid))
    .subscribe(res => {
      this.LastRowFunction();
      this.getAllEmployee(); // this function is used to show all data after deleting particular data
    });
  }

  OpenLgEmployeeEidt(content1, editid) {
    this.EditButtonEnable = true;
    this.editEid = editid;
    this.modalservice.open(content1, { centered: true, size: 'lg' });
    this.http.get('http://localhost:3000/api/v1/getSingleEmployee/'+this.editEid)
    .subscribe(res =>{
      this.getSingleEmpData(res);
    })
  }

  getSingleEmpData(res) {
    this.eid = res[0].EID;
    this.ename = res[0].NAME;
    this.eage = res[0].AGE;
    this.epno = res[0].PHONE;
    console.log(this.eid);
  }
}
