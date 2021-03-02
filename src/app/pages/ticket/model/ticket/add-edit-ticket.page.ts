import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "app-add-edit-ticket",
  templateUrl: "./add-edit-ticket.page.html",
  styleUrls: ["./add-edit-ticket.page.scss"],
})
export class AddEditTicketPageModel implements OnInit {
  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  public empList=[];
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
    this.getEmployee();
    this.myReactiveForm = new FormGroup({
      id:new FormControl(''),
      ticket_name: new FormControl(''),
      assignee: new FormControl(''),
      description: new FormControl(''),
      startdate: new FormControl(''),
      enddate: new FormControl(''),
      isBlocker: new FormControl(''),
      comments: new FormControl(''),
      
  
     
      
    });

    

    if(this.data){
      this.editTicketManagement(this.data);
    }
  }

  onSubmit() {
    this.isShow = false;
    this.user.saveTicket(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast("Ticket added");
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

  editTicketManagement(data) {
    this.isShow = true;
    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set
    this.myReactiveForm.get("id").setValue(data._id);
  }

  updateTicketManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editTicket(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      this.closeModal();
      this.presentToast("Ticket Updated");
    });
  }
  getEmployee() {
    this.user.getEmp().subscribe((result) => {
      console.log("Employee result", result);
      this.empList = result["response"];
    });
  }


 
}
