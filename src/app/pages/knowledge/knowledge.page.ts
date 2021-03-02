import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../users.service";
import { AddEditKnowledgeCenterPageModel } from "./model/knowledge/add-edit-knowledge.page";
// import { AddEditKnowledgeCenterPageModel } from

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.page.html',
  styleUrls: ['./knowledge.page.scss'],
})

export class KnowledgeCenterPage implements OnInit {

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

  getKnowledgeCenterManagement() {
    this.user.getKnowledgeCenter().subscribe((result) => {
      console.log("KnowledgeCenter result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getKnowledgeCenterManagement();

    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      content: new FormControl(''),
      attachments: new FormControl(''),
      tags: new FormControl(this.arr),
      notes: new FormControl(this.arr),
      date: new FormControl(this.arr),
      
    });
  }

  onSubmit() {
    
    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveKnowledgeCenter(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("KnowledgeCenter added");
      this.getKnowledgeCenterManagement();
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

  deleteKnowledgeCenterManagement(id) {
      this.user.deleteKnowledgeCenter(id).subscribe((data) => {
        this.getKnowledgeCenterManagement();
        this.presentToast("KnowledgeCenter Deleted");
      });
  }

 
  editKnowledgeCenterManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateKnowledgeCenterManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editKnowledgeCenter(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("KnowledgeCenter Updated");
      this.getKnowledgeCenterManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete KnowledgeCenter',
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
            self.deleteKnowledgeCenterManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddKnowledgeCenterModal() {
    const modal = await this.modalController.create({
      component: AddEditKnowledgeCenterPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getKnowledgeCenterManagement();
    });
    return await modal.present();
  }

  async openEditKnowledgeCenterModal(body) {
        const modal = await this.modalController.create({
      component: AddEditKnowledgeCenterPageModel,
      componentProps:{
        data:body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getKnowledgeCenterManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }
  
}
