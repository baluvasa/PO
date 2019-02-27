import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';
import { AppLink } from '../app-link';
import { HttpClient } from  "@angular/common/http";

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  error="";
  list:any;  
  holidayform:FormGroup;
  holidaylistform:FormGroup;
  holidayeditlistform:FormGroup;
  projects:any;
  years:any;
  year:any;
  project=null;
  year_default=0;
  jan:any;
  feb:any;
  mar:any;
  Apr:any;
  may:any;
  ip=AppLink.baseURL;
  dtOptions = AppLink.DTOptions; 
  role:any;
  account_names:any;
  results:any;
  holidayslists:any;
  addresult:any;
  addmsg:any;
  adderrormsg:any;
  updatemsg="";
  deletemsg="";

  constructor(private formBuilder: FormBuilder,private eventEmitterService: EventEmitterService,private  httpClient:HttpClient) { 
  }
  
  ngOnInit() {
    this.eventEmitterService.menuinvokefunction();
     if(localStorage.getItem('logeduser')=='ADMIN'){
      this.role=true;
    }
    
    this.projects =[
      {projectname:'GE Energy-NPI Support-ICFC Pro',pid:'000000000029531'},
      {projectname:'IES_GE O&G-Vetco Gray Inc-ES',pid:'C02000013006600'},
      {projectname:'GE Energy - Industrial',pid:'12004711'},
      {projectname:'AVS 6 months',pid:'000000000029578'}
    ];
    this.account_names=[
      {acc_name:'Bhaskar V PO',acc_name_code:'bvp'},
      {acc_name:'HTC (Jul18)',acc_name_code:'htc'},
      {acc_name:'Patrick Old',acc_name_code:'patold'},
      {acc_name:'Aero',acc_name_code:'aero'},
      {acc_name:'Ommi Gopi',acc_name_code:'ommi'},
      {acc_name:'AVS__1st half',acc_name_code:'avs1st'}
    ];
    this.years =[
      {years:"2018"},
      {years:"2019"},
      {years:"2020"},
      {years:"2021"},
      {years:"2022"},
      {years:"2023"},
      {years:"2024"},
    ];


    this.holidayform = new FormGroup({
      search_account_category:new FormControl('',{
        validators: [Validators.required]
      }),
      search_account_name:new FormControl('',{
        validators: [Validators.required]
      }),
      search_project_name:new FormControl('',{
        validators: []
      }),
      search_holidays_years:new FormControl('',{
        validators: []
      })
    })
    this.holidaylistform = new FormGroup({
      add_account_category:new FormControl('',{
        validators: [Validators.required],
      }),
      add_account_name:new FormControl('',{
        validators: [Validators.required]
      }),
      add_project_name:new FormControl('',{
        validators: [Validators.required]
      }),
      add_holiday_year:new FormControl('',{
        validators: [Validators.required]
      }),
      holiday_jan:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      holiday_feb:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(1),Validators.min(0)]
      }),
      holiday_mar:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      holiday_apr:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      holiday_may:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      holiday_jun:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      holiday_jul:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      holiday_aug:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      holiday_sep:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      holiday_oct:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      holiday_nov:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      holiday_dec:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      })
    })
    this.holidayeditlistform = new FormGroup({
      edit_account_category:new FormControl('',{
        validators: [Validators.required]
      }),
      edit_account_name:new FormControl('',{
        validators: [Validators.required]
      }),
      edit_project_name:new FormControl('',{
        validators: [Validators.required]
      }),
      edit_project_year:new FormControl('',{
        validators: [Validators.required]
      }),
      jan_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      feb_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(28)]
      }),
      mar_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      Apr_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      may_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      jun_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      jul_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      aug_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      sep_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      oct_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      }),
      nov_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(30)]
      }),
      dec_edit:new FormControl('',{
        validators: [Validators.required,Validators.maxLength(2),Validators.min(0),Validators.max(31)]
      })
    })
   
  }
  leap_year(date_value)
  {
   //let year=this.holidaylistform[0].add_holiday_year.value;
   let year=$("#year_val").val();
   if(date_value!=""){
    let leap_year_validate=year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
   if(leap_year_validate==true && (date_value<=29)){
       return true;
   }
   else if(leap_year_validate==true && (date_value>29)){
     return "leap_year";
 }
   else if(leap_year_validate==false &&date_value>28 || date_value < 0){
          return false;
   }
   else return ;
  
  }
   }
  
  search_holidays_details(value){  
    //let url=this.ip+'/po/holidays/fetch?accountCategory='+asd+'&accountName='+asd+'&projectName='+asd+'&year='+value.search_account_name;
    let url=this.ip+'/po/holidays/fetch?accountCategory='+value.search_account_category+'&accountName='+value.search_account_name+'&projectName='+value.search_project_name+'&year='+value.search_holidays_years;
    this.httpClient.get(url).subscribe(result => {    
        this.results=result;
        this.holidayslists=this.results.holidaysDetails;
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });
  }
  

  update_holiday_modal_screen(holidaylist){
   this.holidayeditlistform.setValue({
      edit_account_category:holidaylist.accountCategory,
      edit_account_name:holidaylist.accountName,
      edit_project_name:holidaylist.projectName,
      edit_project_year:holidaylist.year,
      jan_edit:holidaylist.january,
      feb_edit:holidaylist.february,
      mar_edit:holidaylist.march,
      Apr_edit:holidaylist.april,
      may_edit:holidaylist.may,
      jun_edit:holidaylist.june,
      jul_edit:holidaylist.july,
      aug_edit:holidaylist.august,
      sep_edit:holidaylist.september,
      oct_edit:holidaylist.october,
      nov_edit:holidaylist.november,
      dec_edit:holidaylist.december
    });
  }

  closemsg(){
    this.addmsg='';
    this.error='';
    this.adderrormsg='';
    this.updatemsg='';
  }
  add_holiday_list_form(addholidaydata){
    let holidays={
            accountCategory: addholidaydata.add_account_category,
            accountName: addholidaydata.add_account_name,
            projectName:  addholidaydata.add_project_name,
            year: addholidaydata.add_holiday_year,
            january: addholidaydata.holiday_jan,
            february:  addholidaydata.holiday_feb,
            march: addholidaydata.holiday_mar,
            april:  addholidaydata.holiday_apr,
            may: addholidaydata.holiday_may,
            june: addholidaydata.holiday_jun,
            july: addholidaydata.holiday_jul,
            august:  addholidaydata.holiday_aug,
            september:  addholidaydata.holiday_sep,
            october: addholidaydata.holiday_oct,
            november: addholidaydata.holiday_nov,
            december: addholidaydata.holiday_dec,
            createdBy: 'ADMIN'
          };
    let url=this.ip+'/po/holidays/add ';
    this.httpClient.post(url,holidays).subscribe(result => {
      this.addresult=result;
      if(this.addresult.status==201){
        this.addmsg=this.addresult.message;
        this.holidaylistform.reset();
      }
      else if(this.addresult.status==409){
        this.adderrormsg=this.addresult.message;
        this.holidaylistform.reset();
      }
    },
    error => {
      this.error = 'Connection Interrupted..'; 
    });

  }
  delete_hoilday_data(delete_data){

    if (confirm("Do you want to delete the Holiday Details?")) {    
      let delurl=this.ip+'/po/holidays/delete?accountCategory='+delete_data.accountCategory+'&accountName='+delete_data.accountName+'&projectName='+delete_data.projectName+'&year='+delete_data.year;
      this.httpClient.delete(delurl).subscribe(result => {
        this.addresult=result;
        if(this.addresult.status==200){
          this.deletemsg=this.addresult.message;
          alert(this.deletemsg);
          let data={
            search_account_category:'',
            search_account_name:'',
            search_project_name:'',
            search_holidays_years:''
          };
          this.search_holidays_details(data);
        } 
      },
      error => {
        this.error = 'Connection Interrupted..'; 
      })
    
    } 
  }



  // For Updating Holidays for any selected year

  update_holiday_list_form(update_data)
  {
    let modilfyurl=this.ip+'/po/holidays/modify';  
    let updateholidaylist={
      accountCategory: update_data.edit_account_category,
      accountName: update_data.edit_account_name,
      year:  update_data.edit_project_year,
      projectName: update_data.edit_project_name,
      january: update_data.jan_edit,
      february:  update_data.feb_edit,
      march: update_data.mar_edit,
      april:  update_data.Apr_edit,
      may: update_data.may_edit,
      june: update_data.jun_edit,
      july: update_data.jul_edit,
      august: update_data.aug_edit,
      september: update_data.sep_edit,
      october: update_data.oct_edit,
      november: update_data.nov_edit,
      december: update_data.dec_edit,
      modifiedBy: 'admin'
    };
     this.httpClient.put(modilfyurl,updateholidaylist).subscribe(result => {
       this.addresult=result;
       if(this.addresult.status==200){
         this.updatemsg=this.addresult.message;
         let data={
          search_account_category:'',
          search_account_name:'',
          search_project_name:'',
          search_holidays_years:''
        };
         this.search_holidays_details(data);
       }
     },
     error => {
       this.error = 'Connection Interrupted..'; 
     });
 
  }

}
