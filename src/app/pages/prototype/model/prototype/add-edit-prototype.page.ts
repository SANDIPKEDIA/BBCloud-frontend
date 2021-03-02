import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-prototype",
  templateUrl: "./add-edit-prototype.page.html",
  
})
export class AddEditPrototypePageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
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
    this.myReactiveForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl(""),
      description: new FormControl(""),
      catagory: new FormControl(""),
      designs_count: new FormControl(""),
    });

    

    if(this.data){
      this.editPrototypeManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.savePrototype(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Prototype added");
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

  editPrototypeManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updatePrototypeManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editPrototype(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
    });
  }
}
