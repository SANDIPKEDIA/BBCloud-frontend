import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditTodoPageModel } from "./model/todo/add-edit-todo.page";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})

export class TodoPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  formData;
  public arr:any=[];
  public show: boolean = false;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getTodoManagement() {
    this.user.getTodo().subscribe((result) => {
      console.log("Todo result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getTodoManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      task_name: new FormControl(''),
      userId: new FormControl(''),
      incompleted_task: new FormControl(''),
      priority: new FormControl(),
      date: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveTodo(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Todo added");
      this.getTodoManagement();
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

  deleteTodoManagement(id) {
      this.user.deleteTodo(id).subscribe((data) => {
        this.getTodoManagement();
        this.presentToast("Todo Deleted");
      });
  }

 
  editTodoManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateTodoManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTodo(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Todo Updated");
      this.getTodoManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Todo',
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
            self.deleteTodoManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddTodoModal() {
    const modal = await this.modalController.create({
      component: AddEditTodoPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTodoManagement();
    });
    return await modal.present();
  }

  async openEditTodoModal(body) {
        const modal = await this.modalController.create({
      component: AddEditTodoPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getTodoManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
