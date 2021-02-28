import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditVacancyPageModel } from "./model/vacancy/add-edit-vacancy.page";

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.page.html',
  styleUrls: ['./vacancy.page.scss'],
})

export class VacancyPage implements OnInit {

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

  getVacancyManagement() {
    this.user.getVacancy().subscribe((result) => {
      console.log("Vacancy result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getVacancyManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      post_name: new FormControl(''),
      description: new FormControl(''),
      vacancies: new FormControl(''),
      skills: new FormControl(this.arr),
      minQualification: new FormControl(''),
      experience: new FormControl(''),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveVacancy(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Vacancy added");
      this.getVacancyManagement();
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

  deleteVacancyManagement(id) {
      this.user.deleteVacancy(id).subscribe((data) => {
        this.getVacancyManagement();
        this.presentToast("Vacancy Deleted");
      });
  }

 
  editVacancyManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateVacancyManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editVacancy(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Vacancy Updated");
      this.getVacancyManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Vacancy',
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
            self.deleteVacancyManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddVacancyModal() {
    const modal = await this.modalController.create({
      component: AddEditVacancyPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getVacancyManagement();
    });
    return await modal.present();
  }

  async openEditVacancyModal(body) {
        const modal = await this.modalController.create({
      component: AddEditVacancyPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getVacancyManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
