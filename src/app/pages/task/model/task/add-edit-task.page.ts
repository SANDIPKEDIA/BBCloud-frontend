import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-task",
  templateUrl: "./add-edit-task.page.html",
  styleUrls: ["./add-edit-task.page.scss"],
})
export class AddEditTaskPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  public employeeList=[];
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
    this.getEmployee();

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

    

    if(this.data){
      this.editTaskManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveTask(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Task added");
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

  editTaskManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateTaskManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTask(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Task Updated");
    });
  }

  getEmployee() {
    this.user.getEmp().subscribe((result) => {
      console.log("Employee result", result);
      this.employeeList = result["response"];
    });
  }
}
