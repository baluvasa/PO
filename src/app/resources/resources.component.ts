import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resourceform:FormGroup;
  resourceeditform:FormGroup;
  role:any;
  error:any;
  dtOptions: any = {};
  list:any;
  editerror:any;
  edit=0;
  band:any;

  resourceaddform:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(localStorage.getItem('logeduser')=='admin'){
      this.role=true;
    }
    this.dtOptions = {
   
        dom: 'Bfrtip',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 rows', '25 rows', '50 rows', 'Show all' ]
        ],
        pagingType: 'full_numbers',
        buttons: [
          'pageLength',
          'colvis',
          'excel'
        ]
      };

      this.band=[
        {bandname:'U1'},  {bandname:'U2'},  {bandname:'U3'},  {bandname:'U4'}
      ];
    this.resourceform = new FormGroup({
      associatename:new FormControl('',{
        validators: [Validators.required]
      }),
      associateid:new FormControl('',{
        validators: [Validators.required]
      }),
      desigination:new FormControl('',{
        validators: [Validators.required]
      })
    });
    this.resourceaddform = new FormGroup({
      addassociatename:new FormControl('',{
        validators: [Validators.required]
      }),
      addassociateid:new FormControl('',{
        validators: [Validators.required]
      }),
      addband:new FormControl('',{
        validators: [Validators.required]
      }),
      addemailid:new FormControl('',{
        validators: [Validators.required]
      }),
      addcno:new FormControl('',{
        validators: [Validators.required]
      })
    });
    this.resourceeditform = new FormGroup({
      editassociatename:new FormControl('',{
        validators: [Validators.required]
      }),
      editassociateid:new FormControl('',{
        validators: [Validators.required]
      }),
      editband:new FormControl('',{
        validators: [Validators.required]
      }),
      editemailid:new FormControl('',{
        validators: [Validators.required]
      }),
      editcno:new FormControl('',{
        validators: [Validators.required]
      })
    });
 }
 getData(){    
  this.list = [
    {sno:1,associatename:'Prashanthi',id:'NP00585716',band:'u3'},
    {sno:2,associatename:'suman',id:'SK00550019',band:'u4'},
    {sno:3,associatename:'srinitha',id:'SR00551505',band:'u2'},
  
  ];
  
}
errordata() {
  this.error = 'no data found';
}
errorexceptiondata() {
  this.error = 'Exception has occurred while fetching resource details';
}
badrequest() {
  this.error="Bad Request";
}
sendvalue(v)
{
 console.log(v);
 alert("Data Added Successfully.");
 this.resourceaddform.reset();
}
saveeditvalue(v)
{
  console.log(v);
  this.resourceeditform.reset();
   alert("Data Updated Successfully.");
}
deletedata(){
  if (confirm("Do you want to delete Resource For the Year?")) {
    alert("Resource Details Deleted Successfully.")
  } 
}


}
