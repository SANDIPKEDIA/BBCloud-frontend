import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditInductionPageModel } from "./model/induction/add-edit-induction.page";

@Component({
  selector: 'app-induction',
  templateUrl: './induction.page.html',
  styleUrls: ['./induction.page.scss'],
})

export class InductionPage implements OnInit {

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

  getInductionManagement() {
    this.user.getInduction().subscribe((result) => {
      console.log("Induction result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getInductionManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      emp_name: new FormControl(''),
      empId: new FormControl(''),
      joining_date: new FormControl(''),
      induction_completed_date: new FormControl(''),
      status: new FormControl(''),
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveInduction(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Induction added");
      this.getInductionManagement();
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

  deleteInductionManagement(id) {
      this.user.deleteInduction(id).subscribe((data) => {
        this.getInductionManagement();
        this.presentToast("Induction Deleted");
      });
  }

 
  editInductionManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateInductionManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editInduction(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Induction Updated");
      this.getInductionManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Induction',
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
            self.deleteInductionManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddInductionModal() {
    const modal = await this.modalController.create({
      component: AddEditInductionPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getInductionManagement();
    });
    return await modal.present();
  }

  async openEditInductionModal(body) {
        const modal = await this.modalController.create({
      component: AddEditInductionPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getInductionManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
