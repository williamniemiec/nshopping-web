import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CityDTO } from '../../dto/city.dto';
import { StateDTO } from '../../dto/state.dto';
import { CityService } from '../../services/domain/CityService';
import { ClientService } from '../../services/domain/ClientService';
import { StateService } from '../../services/domain/StateService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignUpPage implements OnInit {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    public router: Router, 
    //public navParams: NavParams, 
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

  ngOnInit() {
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

  async showInsertOf() {
    const alert = await this.alertController.create({
      header: "Success!",
      message: "Registration has successfully completed",
      backdropDismiss: false,
      buttons: [
        {text: "Ok", handler: () => {this.router.navigateByUrl('/home')}}
      ]
    });

    alert.present();
  }
}
