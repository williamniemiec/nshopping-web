import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityDTO } from '../../dto/CityDTO';
import { StateDTO } from '../../dto/StateDTO';
import { CityService } from '../../services/domain/CityService';
import { ClientService } from '../../services/domain/ClientService';
import { StateService } from '../../services/domain/StateService';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertController: AlertController
  ) {
    this.formGroup = formBuilder.group({
      name: ['Fulano 2', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['fulano2@gmail.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      documentId: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      streetName: ['Rua Via', [Validators.required]],
      number: ['25', [Validators.required]],
      apt: ['Apto 3', []],
      district: ['Copacabana', []],
      zip: ['10828333', [Validators.required]],
      phone1 : ['977261827', [Validators.required]],
      phone2 : ['', []],
      phone3 : ['', []],
      stateId : [null, [Validators.required]],
      cityId : [null, [Validators.required]]      
    });
  }

  ionViewDidLoad() {
    this.stateService
      .findAll()
      .subscribe(
        (response) => {
          this.states = response;
          this.formGroup.controls.stateId.setValue(this.states[0].id);
          this.updateCities();
        },
        (error) => {}
      );
  }

  updateCities() {
    const selectedState = this.formGroup.controls.stateId.value;

    this.cityService
      .findAll(selectedState)
      .subscribe(
        (response) => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(null)
        },
        (error) => {}
      );
  }

  signupUser() {
    this.clientService
      .insert(this.formGroup.value)
      .subscribe(
        (response) => {
          this.showInsertOf();
        },
      (error) => {}
      );
  }

  showInsertOf() {
    const alert = this.alertController.create({
      title: "Success!",
      message: "Registration has successfully completed",
      enableBackdropDismiss: false,
      buttons: [
        {text: "Ok", handler: () => {this.navCtrl.pop()}}
      ]
    });

    alert.present();
  }
}
