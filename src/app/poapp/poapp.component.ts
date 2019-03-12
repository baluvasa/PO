import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';
import { AppLink } from '../app-link';
import { HttpClient } from '@angular/common/http'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-poapproval',
  templateUrl: './poapp.component.html',
  styleUrls: ['./poapp.component.scss']
})
export class PoappComponent implements OnInit {
  poapprovalform: FormGroup;
  addpoform: FormGroup;
  addprojectinfoform:FormGroup;
  adderror:any;
addresult:any;
addmsg:any;

  error:any;
  projects:any;
  project_years:any;
  associates:any;
  leavelists:any;
  emplists:any; 
  ip=AppLink.baseURL;
  dtOptions = AppLink.DTOptions;
  month_year = AppLink.dateRange;
  role:any;
  crud_url:any;
  month_default=0;
  currency_default=0;
  results:any;
  account_all_project_info:any;
  account_category_dropdown:any;
  account_name_data:any;
  project_name_data:any;
  project_year_month:any;
  project_customer_name:any;
  project_start_date:any;
  project_end_date:any;
  project_billing_cycle:any;
  project_pid:any;
  projectdata:any;
  emplistexpand:any;
  resourcelist:any;


  constructor(private formBuilder: FormBuilder,private eventEmitterService:EventEmitterService,private httpClient:HttpClient ) { }

  ngOnInit() {
    
    this.eventEmitterService.menuinvokefunction();
    if(localStorage.getItem('logeduser')=='ADMIN'){
      this.role=true;
    }

    this.projects=[
      {name:'Time&Material'},
      {name:'Fixed'},
   
     
    ];
    this.project_years=[
      {year_month:'Jan-2019'},
      {year_month:'Feb-2019'},
      {year_month:'Mar-2019'},
      {year_month:'Apr-2019'}  
    ];
    this.associates=[
      {associateid:'505050', name:"Vijay Krishna"},
      {associateid:'505051', name:"Vishal Gourav"},
      {associateid:'505052', name:"Balu Vasa"},
      {associateid:'505053', name:"Mani Bandari"}  
    ];
    this.poapprovalform = new FormGroup({
      associatesid:new FormControl('',{}),
      associatesname:new FormControl('',{}),    
      projectyear:new FormControl('',{}),
     accountCategory:new FormControl('',{}),   
      
    })
    this.addpoform = new FormGroup({
      modalaccountcategory:new FormControl('',{
        validators: [Validators.required]
      }),
      modalaccountname:new FormControl('',{
        validators:[Validators.required]
      }),
      modalprojectname:new FormControl('',{
        validators: [Validators.required]
      }),
      modalcustomername:new FormControl('',{
        validators:[Validators.required]
      }),
      modalpo_year_month:new FormControl('',{
        validators: [Validators.required]
      }),
      modalprojectstartdate:new FormControl('',{
        validators: [Validators.required]
      }),
      modalprojectenddate:new FormControl('',{
        validators: [Validators.required]
      }),
      modalprojectbilling:new FormControl('',{
        validators: [Validators.required]
      }),
      modalprojectpid:new FormControl('',{
        validators: [Validators.required]
      })
    })
   
  
      
  }

  // GET call to get data of account category on Page Load 
search_account_category_details(value){
  this.crud_url=this.ip+'/po/po_approval/fetch';
  this.httpClient.get(this.crud_url).subscribe(result => {
    this.results=result;
    if(this.results.status==200){
      this.account_category_dropdown=this.results.accountCategoryList;
    }
  },
  error =>{
    this.error='Connection Interrupted';
  });
}

//Get all data after selecting a value in account category

search_all_project_info(acc_cat_project_info){
  this.crud_url=this.ip+'/po/po_approval/fetch/projectInfoList?accountCategory=GE Industrial - US India';
  this.httpClient.get(this.crud_url).subscribe(result => {
    this.results=result;
    console.log("resulttttttt",this.results);
    console.log("resulttttttt",this.crud_url);
    if(this.results.status==200){
      this.account_all_project_info=this.results.projectInfoList;
    }
  },
  error =>{
    this.error='Connection Interrupted';
  });
}

//fetch all project data based on selected account category and account name
get_all_project_info(target){
  this.projectdata = this.account_all_project_info.filter(t=>t.accountName == target);
  this.project_pid=this.projectdata[0].pid;
  this.project_name_data=this.projectdata[0].projectName;
  this.project_customer_name=this.projectdata[0].customerName;
  this.project_start_date=this.projectdata[0].projectStartDate;
  this.project_end_date=this.projectdata[0].projectEndDate;
  this.project_billing_cycle=this.projectdata[0].billingCurrency;
  this.project_year_month=this.month_year(this.projectdata[0].projectStartDate,this.projectdata[0].projectEndDate); //calls dateRange method in app-link.ts
}


  nodata(){

    this.error="No Data Found";
}
exception(){
    this.error="Exception has occurred while Fetching the Data";
}
badrequest(){
    this.error="Bad Request";
}
searchpodata(){
 
  this.leavelists=[
    {sno:'1',associateid:'GE Appliances', associatename:"GE INDIA EXPORTS PVT LTD",pname:'GE P&W-A', pbc:"EUR",yearmonth:'Jan-2018',pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE Industrial', associatename:"GE Oil & Gas",pname:'GE P&W-A',pbc:'JPY', yearmonth:"Feb-2019",pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE P&W', associatename:"GE P&W-A",pname:'GE P&W-A',pbc:'JPY', yearmonth:"Feb-2018",pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE Industrial', associatename:"GE Amphenol",pname:'GE P&W-A',pbc:'EUR', yearmonth:"Jan-2015",pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE Appliances', associatename:"GE Oil & Gas",pname:'GE P&W-A',pbc:'USD', yearmonth:"Aug-2009",pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE Appliances', associatename:"GE Oil & Gas",pname:'GE P&W-A',pbc:'JPY', yearmonth:"Oct-2018",pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE Appliances', associatename:"GE Oil & Gas",pname:'GE P&W-A',pbc:'USD', yearmonth:"Dec-2019",pcurr:'6,66,000.23'},
    {sno:'1',associateid:'GE Appliances', associatename:"GE Oil & Gas",pname:'GE P&W-A',pbc:'EUR', yearmonth:"Nov-2016",pcurr:'6,66,000.23'},
  ];
  this.emplists=[
    {sno:'1',account:'AVS 2019', customer_name:"Amphenol Interconnect India Private Lt",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:"1-Jan-19",enddate:'1-Dec-19',daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
    {sno:'1',account:'Aero', customer_name:"General Electric Company",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:"1-Jan-19",daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
    {sno:'1',account:'SUEZ', customer_name:"SUEZ WTS Solutions USA, Inc.",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:"1-Jan-19",daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
    {sno:'1',account:'RM&D_Sustaining (IGEN)', customer_name:"General Electric Company",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:"1-Jan-19",daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
    {sno:'1',account:'Osmonics - Jan 2018', customer_name:"GE Osmonics, Inc.",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:"1-Jan-19",daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
    {sno:'1',account:'GEPC 2018 (Long)', customer_name:"GE Energy Power Conversion USA Inc",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:"1-Jan-19",daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
    {sno:'1',account:'HTC', customer_name:"GE India Industrial Pvt Limited",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:"1-Jan-19",daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5',gid:'MK00601667',name:'Sharath Babu',assosdate:'12-06-2016',assoedate:'18-06-2019',releasingin:'220 days',uom:'U2',band:'8',rates:' ₹ 1,205.00',rate:' ₹ xx,205.00'},
  ];
  this.emplistexpand=[
    {sno:'1',account:'AVS 2019', customer_name:"Amphenol Interconnect India Private Lt",pid:'000000000029578',quote:'QMS0107575',contract:"TML220210",sdate:'1-Jan-19',enddate:'1-Dec-19',daysleft:'124',po:'0048900',balance:' ₹ 3,726,520.00 ',avgbilling:' ₹ 248,500.00 ',monthscons:'5'},
   
  ];
  this.resourcelist=[
    {sno:'1',GID:'VG00466174', associate_name:"Vishal Gaurav",Assosdate:"03-06-2016",Assoedate:'03-09-2019',rel:"110",band:'U3',uom:'8',rates:' ₹ 1,205.00'},
    {sno:'2',GID:'SA00587674', associate_name:"SD IMRAN AKHIL",Assosdate:"03-06-2016",Assoedate:'03-09-2019',rel:"180",band:'U3',uom:'8',rates:' ₹ 1,805.00'},
    {sno:'3',GID:'MB00406123', associate_name:"MANI BANDARI",Assosdate:"03-06-2016",Assoedate:'03-09-2019',rel:"230",band:'U3',uom:'8',rates:' ₹ 2,805.00'},
     {sno:'4',GID:'BV00586358', associate_name:"BALA KRISHANA V",Assosdate:"03-06-2016",Assoedate:'03-09-2019',rel:"720",band:'U3',uom:'8',rates:' ₹ 3,805.00'},
      {sno:'5',GID:'AD00145654', associate_name:"ADDALA DHARMA",Assosdate:"03-06-2016",Assoedate:'03-09-2019',rel:"1120",band:'U3',uom:'8',rates:' ₹ 4,805.00'},
    
   
  ];
}

input_search_po_data (value){
  let category={gid:value.addassociateid,associateName:value.addassociatename,accessType:value.addaccesstype,status:value.addstatus,createdBy:'admin'};
  console.log(category)
  let url=this.ip+'/po/access/add';
  this.httpClient.post(url,category).subscribe(result => {
    this.addresult=result;
    if(this.addresult.status==201){
      this.addmsg=this.addresult.message;
      // this.addaccessdetails.reset();
      // let data={associateid:'',associatename:'',accesstype:'',status:''};
      // this.searchleaves(data);
    }
    else if(this.addresult.status==409){
      this.addmsg=this.addresult.message;    
    }
  },
  error => {
    this.adderror = 'Connection Interrupted..'; 
  });
}
}

  
