import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { API_CONFIG } from '../../config/api.config';
import { ClientDTO } from '../../dto/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { ImageService } from '../../services/image.service';
import { StorageService } from '../../services/storage.service';


/**
 * Responsible for representing profile page.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  client: ClientDTO;
  picture: string;
  cameraOn: boolean = false;
  profileImage;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public storageService: StorageService,
    public clientService: ClientService,
    public imageService: ImageService,
    public sanitizer: DomSanitizer,
    public authService: AuthService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }

    this.profileImage = 'assets/images/avatar-blank.png';
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    if (this.isAuthenticated()) {
      this.parseAuthenticatedUser();
    }
    else {
      this.router.navigateByUrl('/home');
    }
  }

  private isAuthenticated(): boolean {
    const localUser = this.storageService.getLocalUser();

    return  (localUser != null)
            && (localUser != undefined)
            && (localUser.email != null)
            && (localUser.email != undefined);
  }

  private parseAuthenticatedUser(): void {
    const localUser = this.storageService.getLocalUser();

    this.clientService
      .findByEmail(localUser.email)
      .subscribe(
        (response) => {
          this.client = response as ClientDTO;
          this.loadProfileImageIfExists();
        },
        (_) => {
          this.router.navigateByUrl('/home');
        }
    );
  }

  private loadProfileImageIfExists(): void {
    this.clientService
      .getImageFromBucket(this.client.id)
      .subscribe(
        (response) => {
          this.client.imageUrl = this.generateClientProfileImage(this.client);
          this.imageService.blobToDataURL(response).then(dataUrl => {
            this.profileImage = this.sanitizer.bypassSecurityTrustUrl(dataUrl as string);
          });
        },
        (_) => {
          this.profileImage = this.generateNoProfileImage();
        }
      );
  }

  private generateClientProfileImage(client: ClientDTO): string {
    return `${API_CONFIG.bucketBaseUrl}/cp${client.id}.jpg`;;
  }

  private generateNoProfileImage(): string {
    return 'assets/images/avatar-blank.png';
  }

  public getCameraPicture(): void {
    const options = this.buildTakePictureOptions();

    this.openCameraDevice(options);
  }

  private buildTakePictureOptions(): CameraOptions {
    return {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE
    };
  }

  private openCameraDevice(options: CameraOptions): void {
    this.cameraOn = true;

    Camera.getPicture(options).then((imageData) => {
      this.picture = this.buildImageData(imageData);
      this.cameraOn = false;
    }, 
    (error) => {
      this.cameraOn = false;
      console.error("Camera issue:" + error);
    });
  }

  private buildImageData(imageData): string {
    return `data:image/jpeg;base64,${imageData}`;
  }

  public getGalleryPicture(): void {
    const options = this.buildOpenGalleryOptions();

    this.openCameraDevice(options);
  }

  private buildOpenGalleryOptions(): CameraOptions {
    return {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };
  }

  public sendPicture(): void {
    this.clientService
      .uploadPicture(this.picture)
      .subscribe(
        (_) => {
          this.picture = null;
          this.client.imageUrl = null;
          this.loadProfileImageIfExists();
        },
        (_) => {}
      );
  }

  public cancel(): void {
    this.picture = null;
  }
}
