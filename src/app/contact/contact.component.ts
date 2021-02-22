import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { UsersService } from "../users.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  myReactiveForm: FormGroup;
  list: any;
  constructor(private user: UsersService,public toastController: ToastController) {
   
  }

  getProtoype(){
    this.user.getData().subscribe((result) => {
      console.log("Prototype result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {

    this.getProtoype();

    this.myReactiveForm = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      catagory: new FormControl(null),
      designs_count: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.myReactiveForm);

    this.user.savePrototype(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      this.presentToast('Prototype added')
      this.getProtoype();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:'success'
    });
    toast.present();
  }
}
