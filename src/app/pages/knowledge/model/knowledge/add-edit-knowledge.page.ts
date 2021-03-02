import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-knowledge",
  templateUrl: "./add-edit-knowledge.page.html",
  styleUrls: ["./add-edit-knowledge.page.scss"],
})
export class AddEditKnowledgeCenterPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  // public prototypeList=[];
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
    // this.getProtoype();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      title: new FormControl(''),
      content: new FormControl(''),
      attachments: new FormControl(''),
      tags: new FormControl(this.arr),
      notes: new FormControl(this.arr),
      date: new FormControl(this.arr),
     
      
    });

    

    if(this.data){
      this.editKnowledgeCenterManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveKnowledgeCenter(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("KnowledgeCenter added");
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

  editKnowledgeCenterManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateKnowledgeCenterManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editKnowledgeCenter(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("KnowledgeCenter Updated");
    });
  }
  // getProtoype() {
  //   this.user.getData().subscribe((result) => {
  //     console.log("Project result", result);
  //     this.prototypeList = result["response"];
  //   });
  // }



 
}
