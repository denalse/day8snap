import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  imageData!: string //means not null, ? means optional
  imageWidth!: string;
  form!: FormGroup //type
  canShare = false //value

  constructor(private router: Router, 
    private cameraSvc: CameraService, private fb: FormBuilder) { }

  ngOnInit(): void { //insert business logic
    if (!this.cameraSvc.dataUrl) {
      this.router.navigate(['/'])
      // return
    }

    //const is used when decalring variable
    const x = Math.floor(window.innerWidth * .9) // means?
    this.imageWidth = `${x}` // means ? prevent concat? when to use

    this.imageData = this.cameraSvc.dataUrl

    this.form = this.fb.group({ //build the form
      title: this.fb.control<string>('', [ Validators.required ]),
      caption: this.fb.control<string>('', [ Validators.required ])
    })

    this.canShare = !!navigator.share // = means boolean?
  }

  shareIt() { //method
    console.info('>>> DATA: ', this.form.value) //get current value of control
    //blob is binary large object
    const b = this.dataURItoBlob(this.cameraSvc.dataUrl)

    console.info('>>>TYPE: ', b.type)
    const formValue: any = this.form.value

    navigator.share( { //method?
      title: formValue.title, //both is of type any
      text: formValue.caption + '.jpg', //why not caption:
      files: [ new File ( [ b ], formValue.title + '.jpg', { type: 'image/jpg' } ) ]
    }) // promise
    .then(result => {
      alert('shared: ' + JSON.stringify(result))
      this.router.navigate([ '/' ])
    })
    .catch(error => {
      alert("error: " + JSON.stringify(error)) // why cannot use , in alert?
    })
    
  }

  dataURItoBlob = (dataURI: string) => { // google to understand
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }


}
