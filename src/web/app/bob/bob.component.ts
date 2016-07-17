import { Component } from '@angular/core';
import any = jasmine.any;
declare var SimpleWebRTC: any;
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`bob` component loaded asynchronously');
@Component({
  selector: 'bob',
  templateUrl: './bob.html'
})

export class Bob
{
  constructor() {
  }

  ngOnInit() {
    this.connectVideo();
  }
  connectVideo() {
    var webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideo',
      autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
      webrtc.joinRoom('My room name');
    });
  }
}
