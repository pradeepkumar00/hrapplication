import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AnalyticsService, RestService } from "src/app/core/services";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  showFooter = false;
  headerConfig;
  isExit = false
  users: any
  loading = false

  addForms = false
  selectedIndex = -1


  formsValue;
  selectedTask: any;
  constructor(private restService: RestService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.getUserList()
  }

  getUserList() {
    this.restService.get(environment.API_HOST + '/admin/users').subscribe(res => {
      console.log(res)
      this.loading = false
      this.users = res
    },
      err => {
        this.toastr.error('Something went wrong!', 'Error');
        this.loading = false
        this.router.navigate(['login'])
      })
  }
  ngOnDestroy() {
  }
  edit(i) {
    this.formsValue = this.users[i]
    this.addForms = true
  }
  update(value?, index?) {
    console.log(value)
    this.addForms = !this.addForms
    if (value == null) {
      // this.addForms=!this.addForms
    }
    else if (this.formsValue) {
      value['noOftask'] = value.tasks.length
      delete value['token']
      this.restService.put(environment.API_HOST + '/user/update/' + value.id, value).subscribe(res => {
        this.loading = false
        console.log(res)
        this.toastr.success('User created successfully', 'Success');
        this.getUserList();
      })
      this.formsValue = null
    }
    else {
      console.log(value)
      this.loading = true
      value['noOftask'] = value.tasks.length
      this.restService.post(environment.API_HOST + '/register', value).subscribe(res => {
        this.loading = false
        console.log(res)
        this.toastr.success('User created successfully', 'Success');
        this.getUserList();
      })
    }

  }
  copy(i) {
    navigator.clipboard.writeText('http://localhost:4200?jwt=' + this.users[i].token).then(
      () => {
        this.toastr.success("Text copied to clipboard successfully!");
      },
      (err) => {
        this.toastr.error("Failed to copy text: ", err);
      }
    );
  }
  openTask(value){
    this.selectedTask=value
  }
  close(){
    this.selectedTask=null
  }
  openDoc(url){
    window.open(url)
  }
}
