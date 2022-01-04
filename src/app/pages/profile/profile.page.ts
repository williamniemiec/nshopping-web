import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraOriginal, CameraOptions } from '@ionic-native/camera';
import { NavParams } from '@ionic/angular';
import { API_CONFIG } from '../../config/api.config';
import { ClientDTO } from '../../dto/ClientDTO';
import { ClientService } from '../../services/domain/ClientService';
import { ImageService } from '../../services/ImageService';
import { StorageService } from '../../services/StorageService';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {

  client: ClientDTO;
  picture: string;
  cameraOn: boolean = false;
  profileImage;

  constructor(
    public router: Router, 
    public navParams: NavParams,
    public storageService: StorageService,
    public clientService: ClientService,
    private camera: CameraOriginal,
    public imageService: ImageService,
    public sanitizer: DomSanitizer
  ) {
    this.profileImage = 'assets/images/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storageService.getLocalUser();

    if (localUser && localUser.email) {
      this.clientService
        .findByEmail(localUser.email)
        .subscribe(
          (response) => {
            this.client = response as ClientDTO;
            this.getImageIfExists();
          },
          (error) => {
            this.router.navigateByUrl('/home');
          }
      );
    }
    else {
      this.router.navigateByUrl('/home');
    }
  }

  getImageIfExists() {
    this.clientService
      .getImageFromBucket(this.client.id)
      .subscribe(
        (response) => {
          this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`;
          //this.profileImage = this.client?.imageUrl || 'assets/images/avatar-blank.png'
          this.imageService.blobToDataURL(response).then(dataUrl => {
            this.profileImage = this.sanitizer.bypassSecurityTrustUrl(dataUrl as string);
          });
        },
        (error) => {
          this.profileImage = 'assets/images/avatar-blank.png';
        }
      );
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
      console.log("Camera issue:" + err);
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
      console.log("Camera issue:" + err);
    });
  }

  sendPicture() {
    this.clientService
      .uploadPicture(this.picture)
      .subscribe(
        (response) => {
          this.picture = null;
          this.client.imageUrl = null;
          this.getImageIfExists();
        },
        (error) => {}
      );
  }

  cancel() {
    this.picture = null;
  }
}
