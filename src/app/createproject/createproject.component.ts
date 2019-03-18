import { Component, OnInit} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';
import { AppLink } from '../app-link';
import { HttpClient } from  "@angular/common/http";
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})

export class CreateprojectComponent implements OnInit {  
  maxdate=null;
  mindate=null;
  projectsearchform: FormGroup;
  projectcreateform: FormGroup;
  projectupdateform: FormGroup;
  categories:any;
  projects:any;
  error:any;
  addresult:any;
  addmsg:any;
  deletemsg:any;
  updatemsg:any;
  currentStyles:any;
  acc_category_default=0;
  project_name_default=0;
  acc_category_default1=0;
  acc_category_default2=0;
  project_name_default1=0;
  approval_default=0;
  submission_default=0;
  type_default=0;
  status_default=0;
  type_default1=0;
  status_default1='ACTIVE';
  role:any;
  projectlists:any;
  ip=AppLink.baseURL;
  dtOptions = AppLink.DTOptions; 
  approvalmethods = AppLink.approvalmethods; 
  submisson_modes = AppLink.submitionmodes; 
  types = AppLink.projectTypes; 
  currency_modes = AppLink.billingcurrency; 
  statuses = AppLink.status;
  location_status=AppLink.location;
  myDatePickerOptions=AppLink.myDatePickerOptions;
  catlists:any;
  acnames:any;
  results:any;
  cresources:any;
  grresources:any;
  // approvalmethods:any;
  // currency_modes:any;
  resources:any;
  categories_names:any;
  resourceerror:any;
  // submisson_modes:any;
  constructor(private formBuilder: FormBuilder,private eventEmitterService: EventEmitterService,private  httpClient:HttpClient) {}
  ngOnInit() {
    this.eventEmitterService.menuinvokefunction();
    if(localStorage.getItem('logeduser')=='ADMIN'){
      this.role=true;
    }
    this.projectsearchform = new FormGroup({
      acc_category:new FormControl('',{
        validators: []
      }),
      project_name:new FormControl('',{
        validators: []
      }),
      type:new FormControl('',{
        validators: []
      }),
      status:new FormControl('',{
        validators: []
      })
    })
    this.projectcreateform = new FormGroup({
      acc_category:new FormControl('',{
        validators: []
      }),
      acc_name:new FormControl('',{
        validators: []
      }),
      project_name:new FormControl('',{
        validators: []
      }),
      customer_name:new FormControl('',{
        validators: []
      }),
      customer_spoc:new FormControl('',{
        validators: []
      }),
      approval_method:new FormControl('',{
        validators: []
      }),
      submission_mode:new FormControl('',{
        validators: []
      }),
      project_type:new FormControl('',{
        validators: []
      }),
      billing_currency:new FormControl('',{
        validators: []
      }),
      po_amount:new FormControl('',{
        validators: []
      }),
      start_date:new FormControl('',{
        validators: []
      }),
      end_date:new FormControl('',{
        validators: []
      }),
      unit_of_measurement:new FormControl('',{
        validators: []
      }),
      status:new FormControl('',{
        validators: []
      }),
      delivery_spoc:new FormControl('',{
        validators: []
      }),
      effort_spoc:new FormControl('',{
        validators: []
      }),
      pid:new FormControl('',{
        validators: []
      }),
      quote_id:new FormControl('',{
        validators: []
      }),
      contract_id:new FormControl('',{
        validators: []
      }),
      po_id:new FormControl('',{
        validators: []
      }),
      po_resource_table:new FormControl('',{
        validators: []
      })
    });
    this.projectupdateform = new FormGroup({

      update_id:new FormControl('',{
        validators: []
      }),
      update_acc_category:new FormControl('',{
        validators: []
      }),
      update_acc_name:new FormControl('',{
        validators: []
      }),
      update_project_name:new FormControl('',{
        validators: []
      }),
      update_customer_name:new FormControl('',{
        validators: []
      }),
      update_customer_spoc:new FormControl('',{
        validators: []
      }),
      update_approval_method:new FormControl('',{
        validators: []
      }),
      update_submission_mode:new FormControl('',{
        validators: []
      }),
      update_project_type:new FormControl('',{
        validators: []
      }),
      update_billing_currency:new FormControl('',{
        validators: []
      }),
      update_po_amount:new FormControl('',{
        validators: []
      }),
      update_start_date:new FormControl('',{
        validators: []
      }),
      update_end_date:new FormControl('',{
        validators: []
      }),
      update_unit_of_measurement:new FormControl('',{
        validators: []
      }),
      update_status:new FormControl('',{
        validators: []
      }),
      update_delivery_spoc:new FormControl('',{
        validators: []
      }),
      update_effort_spoc:new FormControl('',{
        validators: []
      }),
      update_pid:new FormControl('',{
        validators: []
      }),
      update_quote_id:new FormControl('',{
        validators: []
      }),
      update_contract_id:new FormControl('',{
        validators: []
      }),
      update_po_id:new FormControl('',{
        validators: []
      })
    });
    this.getcategories();
    this.getcresourcedetails();
  }  
  getcresourcedetails(){
    let cresourcesurl=this.ip+'/po/project/fetch/cresources';
    
    this.httpClient.get(cresourcesurl).subscribe(result => {    
      this.results=result;
      this.cresources=this.results.cresourceDetails;
      console.log(this.cresources)
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });
  }
  getcategories(){
    let caturl=this.ip+'/po/account_category/categories';
    
    this.httpClient.get(caturl).subscribe(result => {    
      this.results=result;
      this.categories=this.results.accountCategories;
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });
  }
  
  search_project_data(project_data){
    let searchprojecturl=this.ip+'/po/project/fetch?accountCategory='+project_data.acc_category+'&projectName='+project_data.project_name+'&projectType='+project_data.type+'&status='+project_data.status;
    this.httpClient.get(searchprojecturl).subscribe(result => {    
      this.results=result;
      this.projectlists=this.results.projectDetailsList;
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });
    
    
  }
  delete_project_data(deletevalue){
    if (confirm("Do you want to delete the Account Details?")) { 
    let delurl=this.ip+'/po/project/delete?pId='+deletevalue.id;
    this.httpClient.delete(delurl).subscribe(result => {
    this.addresult=result;
    console.log(this.addresult)
    if(this.addresult.Status==200){
    this.deletemsg=this.addresult.message;
    console.log(this.deletemsg)
    // alert(this.deletemsg);
    // let data={associateid:'',associatename:'',accesstype:'',status:''};
    // this.searchleaves(data);
    } 
    },
    error => {
    this.error = 'Connection Interrupted..'; 
    }) 
    } 
    }  
  setmaxdate(data){
    this.maxdate=data;
  }
  setmindate(data){
    this.mindate=data;
  }
  
  search_account_category(acc_cat){
    let catnameurl=this.ip+'/po/account_category/category/names?accountCategory='+acc_cat;
    this.httpClient.get(catnameurl).subscribe(result => {    
      this.results=result;
      this.acnames=this.results.accountNames;
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });
  }
  getResourceData(pid){
    if(pid!=""){
      let curl=this.ip+'/po/project/fetch/resources?pId='+pid;
      this.httpClient.get(curl).subscribe(result => {    
        this.results=result;
        if(this.results.status==200){
          this.resources=this.results.resourceDetails;
          
        }
        else if(this.results.status==204){
          this.resourceerror =this.results.message;
          this.currentStyles= { 'border-color': '' };  
        }
        else{
          this.resourceerror =this.results.message;
          this.currentStyles= { 'border-color': 'red' };
          this.resources=[];
          $("#pidbox").focus();
        }
      },
      error => {
        this.error = 'Connection Interrupted..'; 
      });
    }
    else{
      this.resourceerror="";
      this.currentStyles= { 'border-color': '' };
    }
  }
  
  
  // Create A New Project 
  
  add_project_details(project_data){
    let resources_data=$("#resources_data"); 
    let contract_data_resources_data=$("#contract_resources_data"); 
    let all_resources=[];
    let contract_resources=[];
    for(let i=1,k=0;i<=resources_data[0].lastChild.childNodes.length;i++,k++){
      let resource={};
      if($('#'+k+'linked').prop("checked") == true){
        resource["associateId"]=resources_data[0].lastChild.childNodes[i].childNodes[0].textContent;
        resource["location"]=$('#'+k+'location option:selected').text();
        resource["associateStartDate"]=$('#'+k+'startdate').val();
        resource["associateEndDate"]=$('#'+k+'enddate').val();
        resource["ratePerHour"]=$('#'+k+'text').val();
        resource["linked"]='Y';        
        resource["pId"]=project_data.pid;        
        all_resources.push(resource);      
      }
    }
    for(let i=1,k=0;i<=contract_data_resources_data[0].lastChild.childNodes.length;i++,k++){
      let resource={};      
      if($('#'+k+'linked1').prop("checked") == true){
        resource["associateId"]=contract_data_resources_data[0].lastChild.childNodes[i].childNodes[0].textContent;
        resource["location"]=$('#'+k+'location1 option:selected').text();
        resource["associateStartDate"]=$('#'+k+'startdate1').val();
        resource["associateEndDate"]=$('#'+k+'enddate1').val();
        resource["ratePerHour"]=$('#'+k+'text1').val();
        resource["linked"]='Y';        
        resource["pId"]=project_data.pid;        
        all_resources.push(resource);      
        contract_resources.push(resource);
      }
    }
    let project_start_date:any,
    project_end_date:any;
    
    project_start_date=formatDate(project_data.start_date, 'dd-MMM-yyyy', 'en');   
    project_end_date=formatDate(project_data.end_date, 'dd-MMM-yyyy', 'en');   
    
    let all_project_data={
      accountCategory:project_data.acc_category,
      accountName:project_data.acc_name,
      projectName:project_data.project_name,
      customerName:project_data.customer_name,
      customerSpoc:project_data.customer_spoc,
      approvalMethod:project_data.approval_method,
      submissionMode:project_data.submission_mode,
      projectType:project_data.project_type,
      billingCurrency:project_data.billing_currency,
      poAmount:project_data.po_amount,
      status:project_data.status,
      projectStartDate:project_start_date,
      projectEndDate:project_end_date,
      deliverySpoc:project_data.delivery_spoc,
      effortSpoc:project_data.effort_spoc,
      pid:project_data.pid,
      po:project_data.po_id,
      unitOfMeasurement:project_data.unit_of_measurement,
      quote:project_data.quote_id,
      contract:project_data.contract_id,
      createdBy:"ADMIN",
      resources:all_resources,
      resourceCount:all_resources.length,
      contractToPid:contract_resources
    }
    console.log(all_project_data);
    
    let url=this.ip+'/po/project/create';
    this.httpClient.post(url,all_project_data).subscribe(result => {
      this.addresult=result;
      console.log(this.addresult)
      if(this.addresult.status == 201){
        this.addmsg=this.addresult.message; 
        this.projectcreateform.reset();
        this.resources=[];
        this.cresources=[]; 
      }
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });
  }
  update_data_model(projectlist){       
    this.projectupdateform.setValue({
      update_id:projectlist.id,
      update_acc_category:projectlist.accountCategory,
      update_acc_name:projectlist.accountName,
      update_project_name:projectlist.projectName,
      update_customer_name:projectlist.customerName,
      update_customer_spoc:projectlist.customerSpoc,
      update_approval_method:projectlist.approvalMethod,
      update_submission_mode:projectlist.submissionMode,
      update_project_type:projectlist.projectType,
      update_billing_currency:projectlist.billingCurrency,
      update_po_amount:projectlist.poAmount,
      update_start_date:projectlist.projectStartDate,
      update_end_date:projectlist.projectEndDate,
      update_unit_of_measurement:projectlist.unitOfMeasurement,
      update_status:projectlist.status,
      update_delivery_spoc:projectlist.deliverySpoc,
      update_effort_spoc:projectlist.effortSpoc,
      update_pid:projectlist.pid,
      update_quote_id:projectlist.quote,
      update_contract_id:projectlist.contract,
      update_po_id:projectlist.po
    });
    this.getResourceDataonupdate(projectlist.pid);
    this.getcresourcedetails();
  }
  getResourceDataonupdate(pid){
console.log(pid)
let curl=this.ip+'/po/project/fetch/resourcesonupdate?pId='+pid;
this.httpClient.get(curl).subscribe(result => {    
  this.results=result;
  if(this.results.status==200){
    this.grresources=this.results.cresourceDetails;  
    // console.log(this.grresources)  
  }
  else if(this.results.status==204){
    this.resourceerror =this.results.message;
    this.currentStyles= { 'border-color': '' };  
  }
  else{
    this.error = 'Connection Interrupted..';
  }
},
error => {
  this.error = 'Connection Interrupted..'; 
});
  }

}
