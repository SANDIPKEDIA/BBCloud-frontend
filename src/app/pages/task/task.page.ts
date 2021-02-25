import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditTaskPageModel } from "./model/task/add-edit-task.page";

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})

export class TaskPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getTask() {
    this.user.getTaskM().subscribe((result) => {
      console.log("Task result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getTask();
    
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      task_name: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      description: new FormControl(''),
      completeOn: new FormControl(''),
      assignee: new FormControl(''),
      LogHours: new FormControl(''),
      

    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveTask(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Task added");
      this.getTask();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  deleteTaskManagement(id) {
      this.user.deleteTask(id).subscribe((data) => {
        this.getTask();
        this.presentToast("Task Deleted");
      });
  }

 
  editTaskManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateTaskManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTask(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Employee Updated");
      this.getTask();   
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Task',
      message: "Are you sure you want to delete?",
      buttons: [
        {
          text: 'Cancel',

          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            self.deleteTaskManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddEditTaskPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTask();
    });
    return await modal.present();
  }

  async openEditTaskModal(body) {
        const modal = await this.modalController.create({
      component: AddEditTaskPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTask();
    });
    return await modal.present();
  }

 
  
}
