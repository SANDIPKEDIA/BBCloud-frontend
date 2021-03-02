import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-meeting",
  templateUrl: "./add-edit-meeting.page.html",
  styleUrls: ["./add-edit-meeting.page.scss"],
})
export class AddEditMeetingPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  // public prototypeList=[];
  formData;
  // public arr:any=[];
  
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
      meeting_name: new FormControl(''),
      description: new FormControl(''),
      comments: new FormControl(''),
      date: new FormControl(),
      time: new FormControl(''),
      url: new FormControl(''),
      joiness: new FormControl(''),
     
      
    });

    

    if(this.data){
      this.editMeetingManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveMeeting(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Meeting added");
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

  editMeetingManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateMeetingManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editMeeting(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Meeting Updated");
    });
  }
  // getProtoype() {
  //   this.user.getData().subscribe((result) => {
  //     console.log("Project result", result);
  //     this.prototypeList = result["response"];
  //   });
  // }



 
}
