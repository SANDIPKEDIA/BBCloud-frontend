import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-git",
  templateUrl: "./add-edit-git.page.html",
  styleUrls: ["./add-edit-git.page.scss"],
})
export class AddEditGitPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  public prototypeList=[];
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
    this.getProtoype();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      repo_name: new FormControl(''),
      url: new FormControl(''),
      username: new FormControl(''),
      account: new FormControl(''),
      password: new FormControl(''),
      prototypeId: new FormControl(''),
      
    });

    

    if(this.data){
      this.editGitManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveGit(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Git added");
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

  editGitManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateGitManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editGit(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Git Updated");
    });
  }
  getProtoype() {
    this.user.getData().subscribe((result) => {
      console.log("Prototype result", result);
      this.prototypeList = result["response"];
    });
  }



 
}
