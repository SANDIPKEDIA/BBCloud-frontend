import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../providers/product.services";
import { ToastController } from "@ionic/angular";
import { IonInfiniteScroll } from "@ionic/angular";
import { UsersService } from "../../../../users.service";

@Component({
  selector: "page-training-details",
  templateUrl: "training-details.html",
  styleUrls: ["./training-details.scss"],
})
export class TrainingDetailsPage implements OnInit {
  public customerData: any = {
    // fullName: "",
    // CustomerImage: "",
    email: "",
    mobile: "",
    age:"",
    gender:"",
    name:"",
    city: "",
    balance: 0,
  };

  public isToggled: boolean;

  constructor(
    public toastController: ToastController,
    private _ProductService: ProductService,
    private Router: Router,
    private _userServices: UsersService,
    private route: ActivatedRoute
  ) {}

  public updateStatus() {
    console.log("Toggled: " + this.isToggled);
    this._userServices
      .editEmployee(this.customerData._id, {
        isAccountActive: this.isToggled,
      })
      .subscribe(async (results: any) => {
        console.log(results, "res", results.isAccountActive, this.isToggled);

        if (results.nModified == 1) {
          // const toast = await this.toastController.create({
          //   message: 'Status Updated Successfully',
          //    duration: 3000,
          //         color:'secondary',
          //   position: 'bottom',
          //   animated: true,
          // });
          // toast.present();
          this.fetchCustomerDetails(this.customerData._id);
        }
      });
  }

  public searchproductList: any = [];
  ngOnInit() {
    console.log(this.route.snapshot.params);
    let customerId = this.route.snapshot.params.id;
    this.fetchCustomerDetails(customerId);
  }

  profileLabel(name) {
    if (name) {
      let Name = name.split(" ");
      let first = Name[0].charAt(0).toUpperCase();
      let last = Name.length >= 2 ? Name[1].charAt(0).toUpperCase() : "";
      return first + last;
    }
  }

  fetchCustomerDetails(customerId) {
    this._userServices
      .getTrainingDetails(customerId)
      .subscribe((results: any) => {
        this.customerData = results.response[0];
        // this.isToggled = this.customerData.isAccountActive;
        // console.log(results, "res", this.customerData);
         
        // this.customerData["label"] = this.profileLabel(
        //   this.customerData.fullName
        // );
      });
  }
}
