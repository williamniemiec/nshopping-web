import { Injectable } from "@angular/core";


/**
 * Responsible for providing image utilities.
 */
@Injectable(
  { providedIn: 'root' }
)
export class ImageService {

  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  /**
   * Converts a data url to blob image.
   */
  public dataURLtoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], {type: mimeString});
  }

  /**
   * Converts a blob image to data url.
   * 
   * Source: https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
   */
  public blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }
}
