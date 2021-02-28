import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditGitPageModel } from "./model/git/add-edit-git.page";

@Component({
  selector: 'app-git',
  templateUrl: './git.page.html',
  styleUrls: ['./git.page.scss'],
})

export class GitPage implements OnInit {

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

  getGitManagement() {
    this.user.getGit().subscribe((result) => {
      console.log("Git result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getGitManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      repo_name: new FormControl(''),
      url: new FormControl(''),
      username: new FormControl(''),
      account: new FormControl(''),
      password: new FormControl(''),
      prototypeId: new FormControl(''),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveGit(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Git added");
      this.getGitManagement();
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

  deleteGitManagement(id) {
      this.user.deleteGit(id).subscribe((data) => {
        this.getGitManagement();
        this.presentToast("Git Deleted");
      });
  }

 
  editGitManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateGitManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editGit(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Git Updated");
      this.getGitManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Git',
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
            self.deleteGitManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddGitModal() {
    const modal = await this.modalController.create({
      component: AddEditGitPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getGitManagement();
    });
    return await modal.present();
  }

  async openEditGitModal(body) {
        const modal = await this.modalController.create({
      component: AddEditGitPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getGitManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
