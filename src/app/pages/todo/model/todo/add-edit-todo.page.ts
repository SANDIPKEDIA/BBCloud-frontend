import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-todo",
  templateUrl: "./add-edit-todo.page.html",
  styleUrls: ["./add-edit-todo.page.scss"],
})
export class AddEditTodoPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  // public prototypeList=[];
  formData;
  // public arr:any=[];
  
  data: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  async closeModal() {
    const onClosedData: string = "success";
    await this.modalController.dismiss(onClosedData);
  }

  ngOnInit() {
    // this.getProtoype();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      task_name: new FormControl(''),
      userId: new FormControl('602fe83559d91e102820ec0i'),
      incompleted_task: new FormControl(''),
      priority: new FormControl(),
      date: new FormControl(''),
    
     
      
    });

    

    if(this.data){
      this.editTodoManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveTodo(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Todo added");
      this.closeModal();
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

  editTodoManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateTodoManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTodo(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Todo Updated");
    });
  }
  // getProtoype() {
  //   this.user.getData().subscribe((result) => {
  //     console.log("Project result", result);
  //     this.prototypeList = result["response"];
  //   });
  // }



 
}
