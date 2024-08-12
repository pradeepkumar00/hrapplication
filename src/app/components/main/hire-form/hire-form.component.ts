import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hire-form',
  templateUrl: './hire-form.component.html',
  styleUrls: ['./hire-form.component.scss']
})
export class HireFormComponent implements OnInit {
  form: any
  @Input() existingFrom;
  @Output() closeForm=new EventEmitter()
  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    console.log(this.existingFrom)
    if(this.existingFrom){
      this.form=this.fb.group({
        ...this.existingFrom,
        tasks: this.fb.array([])
      })
      this.existingFrom.tasks.forEach(element => {
        let task=this.fb.group(element)
        this.form.get('tasks').push(task)
      });
      console.log(this.form)
      return
    }
    this.form=this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      contact: ['', [Validators.required]],
      dateFiled: ['', Validators.required],
      tasks: this.fb.array([])
    })

    let task=this.fb.group({
      title: ['', [Validators.required]],
      type: ['file', Validators.required],
      desc: ['', [Validators.required]],
      ispending: true,
      feedback:''
    })
    this.form.get('tasks').push(task)

  }
  addTask(){
    let task=this.fb.group({
      title: ['', [Validators.required]],
      type: ['file', Validators.required],
      desc: ['', [Validators.required]],
      ispending: true
    })
    this.form.get('tasks').push(task)

    console.log(this.form)
  }
  close(){
    this.closeForm.emit()
  }

  submit(){
    this.closeForm.emit(this.form.value)
  }
}
