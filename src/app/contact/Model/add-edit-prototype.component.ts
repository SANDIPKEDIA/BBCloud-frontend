import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-add-edit-prototype",
  templateUrl: "./add-edit-prototype.component.html",
  styleUrls: ["./add-edit-prototype.component.scss"],
})
export class AddEditPrototypeComponent implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  getProtoype() {
    this.user.getData().subscribe((result) => {
      console.log("Prototype result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getProtoype();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      catagory: new FormControl(''),
      designs_count: new FormControl(''),
    });
  }

  onSubmit() {
    // if(this.editMode){
    //   this.updatePrototypeManagement(this.formData,this.editUserId)
    // }
    // else{
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.savePrototype(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Prototype added");
      this.getProtoype();
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

  deletePrototypeManagement(id) {
      // if(this.presentAlert('Are you sure to delete?')){
      this.user.deletePrototype(id).subscribe((data) => {
        this.getProtoype();
        this.presentToast("Prototype Deleted");
        // this.presentAlert('Are you sure to delete?')
      });
      // }
  }

 
  editPrototypeManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updatePrototypeManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editPrototype(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.getProtoype();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Prototype',
      message: "Are you sure you want to delete ?",
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
            self.deletePrototypeManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }
}
