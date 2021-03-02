import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-feature",
  templateUrl: "./add-edit-feature.page.html",
  styleUrls: ["./add-edit-feature.page.scss"],
})
export class AddEditFeaturePageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  public packageList=[];
  formData;
  public arr:any=[];
  
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
    this.getPackageManagement();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      package_id: new FormControl(''),
      description: new FormControl(''),
      feature_name: new FormControl(''),
  
     
      
    });

    

    if(this.data){
      this.editFeatureManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveFeature(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Feature added");
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

  editFeatureManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateFeatureManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editFeature(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Feature Updated");
    });
  }
  getPackageManagement() {
    this.user.getPackage().subscribe((result) => {
      console.log("Package result", result);
      this.packageList = result["response"];
    });
  }



 
}
