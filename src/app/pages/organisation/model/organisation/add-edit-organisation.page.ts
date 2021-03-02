import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-organisation",
  templateUrl: "./add-edit-organisation.page.html",
  styleUrls: ["./add-edit-organisation.page.scss"],
})
export class AddEditOrganisationPageModel implements OnInit {
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
      id:new FormControl(''),
      company_name: new FormControl(''),
      registration_id: new FormControl(''),
      employess_count: new FormControl(''),
      type: new FormControl(''),
      category: new FormControl(''),
      business_model: new FormControl(''),
      description: new FormControl(''),
    });

    

    if(this.data){
      this.editOrganisationManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveOrg(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Organisation added");
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

  editOrganisationManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateOrganisationManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editOrg(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Organisaiton Updated");
    });
  }


 
}