import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CityDTO } from '../../dto/city.dto';
import { StateDTO } from '../../dto/state.dto';
import { CityService } from '../../services/domain/city.service';
import { ClientService } from '../../services/domain/client.service';
import { StateService } from '../../services/domain/state.service';


/**
 * Responsible for representing sign up page.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignUpPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertController: AlertController
  ) {
    this.formGroup = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      documentId: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      number: ['', [Validators.required]],
      apt: ['', []],
      district: ['', []],
      zip: ['', [Validators.required]],
      phone1 : ['', [Validators.required]],
      phone2 : ['', []],
      phone3 : ['', []],
      stateId : ['', [Validators.required]],
      cityId : ['', [Validators.required]]      
    });
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    this.stateService
      .findAll()
      .subscribe(
        (response) => {
          this.states = response;
          this.formGroup.controls.stateId.setValue(this.states[0].id);
          this.updateCities();
        },
        (_) => {}
      );
  }

  public updateCities(): void {
    const selectedState = this.formGroup.controls.stateId.value;

    this.cityService
      .findAll(selectedState)
      .subscribe(
        (response) => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(null)
        },
        (_) => {}
      );
  }

  public signupUser(): void {
    this.clientService
      .insert(this.formGroup.value)
      .subscribe(
        (_) => {
          this.showInsertOf();
        },
        (_) => {}
      );
  }

  private async showInsertOf(): Promise<void> {
    const alert = await this.createAlert(
      'Success!',
      'Registration has successfully completed'
    );

    alert.present();
  }

  private createAlert(title: string, message: string): Promise<HTMLIonAlertElement> {
    return this.alertController.create({
      header: title,
      message: message,
      backdropDismiss: false,
      buttons: [
        {text: "Ok", handler: () => {this.router.navigateByUrl('/home')}}
      ]
    });
  }
}
