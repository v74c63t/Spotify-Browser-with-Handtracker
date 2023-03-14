import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: string = "";
  constructor() { }

  ngOnInit() {
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    // localStorage.setItem('gesture', this.gesture);
    // if(this.gesture == "Two Open Hands") {
    //   window.location.href = 'https://open.spotify.com/user/31by4hs6trtycq5feotdj2jskhrq';
    // }
  }

}
