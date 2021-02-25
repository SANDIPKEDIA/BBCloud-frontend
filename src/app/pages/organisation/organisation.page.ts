import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditOrganisationPageModel } from "./model/organisation/add-edit-organisation.page";

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.page.html',
  styleUrls: ['./organisation.page.scss'],
})

export class OrganisationPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  editUserId;
  formData;
  public show: boolean = false;
  list: any;
  // public del: string;
  constructor(
    private user: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {}

  getOrganisation() {
    this.user.getOrg().subscribe((result) => {
      console.log("organisation result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getOrganisation();

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
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveOrg(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("organisation added");
      this.getOrganisation();
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

  deleteOrganisationManagement(id) {
      this.user.deleteOrg(id).subscribe((data) => {
        this.getOrganisation();
        this.presentToast("organisation Deleted");
      });
  }

 
  editOrganisationManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateOrganisationManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editOrg(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("organisation Updated");
      this.getOrganisation();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Organisation',
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
            self.deleteOrganisationManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddOrganisationModal() {
    const modal = await this.modalController.create({
      component: AddEditOrganisationPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getOrganisation();
    });
    return await modal.present();
  }

  async openEditOrganisationModal(body) {
        const modal = await this.modalController.create({
      component: AddEditOrganisationPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getOrganisation();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
