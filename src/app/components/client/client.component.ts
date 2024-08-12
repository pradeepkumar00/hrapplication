import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService, RestService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { FileHandle } from './drag.directive';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  profile;
  selectedTask
  selectedIndex=-1
  file: any;
  textValue: String=''
  days: any;
  constructor(private profileService: ProfileService, private restService: RestService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.profile=this.profileService.getProfile()
    console.log(this.profile)
    this.selectedTask=this.profile.tasks[0]
    this.getDiff()
  }
  close(){
    this.selectedIndex=-1
    this.selectedTask==null
  }
  selectTask(task,i){
    this.selectedTask=task
    this.selectedIndex=i
    console.log(this.selectedIndex)
  }
  getDiff(){
    const date1 : number = new Date(this.profile.dateFiled).getTime();
    const date2: number = new Date().getTime();

    this.days=(date1 - date2) / (1000 * 3600 * 24)
    this.days=Math.floor(this.days)
  }
  

  filesDropped(file : any): void {
    console.log(file)
    if(file.type=='image/jpg' ||  file.type=='image/png' || file.type=='image/jpeg' || file.type=='application/pdf'){
      this.file = file;
    }
    else{
      console.log('err')
      this.toastr.warning('plese upload proper document')
    }
  }

  upload(text?): void {
    
    if(this.file!=null){
      let formData=new FormData()
      formData.append('file', this.file);
      formData.append('task_index', this.selectedIndex.toString());
      this.restService.post(environment.API_HOST+'/upload/',formData).subscribe((res: any)=>{
        this.profileService.setProfile(res.user_profile)
        this.profile=res.user_profile
      })
    }
    else{
      this.restService.post(environment.API_HOST+'/update-task/',{task_data: this.textValue, task_index: this.selectedIndex}).subscribe((res: any)=>{
        console.log(res)
        this.profileService.setProfile(res.user_profile)
        this.profile=res.user_profile
      })
    }
    this.selectedIndex=-1
  }


}
