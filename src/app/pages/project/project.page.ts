import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditProjectPageModel } from "./model/project/add-edit-project.page";

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})

export class ProjectPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
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

  getProjectManagement() {
    this.user.getProject().subscribe((result) => {
      console.log("Project result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getProjectManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      head: new FormControl(''),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveProject(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Project added");
      this.getProjectManagement();
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

  deleteProjectManagement(id) {
      this.user.deleteProject(id).subscribe((data) => {
        this.getProjectManagement();
        this.presentToast("Project Deleted");
      });
  }

 
  editProjectManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateProjectManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editProject(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Project Updated");
      this.getProjectManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Project',
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
            self.deleteProjectManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddProjectModal() {
    const modal = await this.modalController.create({
      component: AddEditProjectPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getProjectManagement();
    });
    return await modal.present();
  }

  async openEditProjectModal(body) {
        const modal = await this.modalController.create({
      component: AddEditProjectPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getProjectManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
