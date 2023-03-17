import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { PredictionEvent } from 'src/app/prediction-event';
import { SpotifyService } from '../../services/spotify.service';
import { HandtrackerComponent } from '../handtracker/handtracker.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;
  gesture: String = "";
  // private handtracker: HandtrackerComponent;
  // private home: HomePageComponent;

  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }
  

  // ngOnInit() {
  //   this.handtracker.onPrediction.subscribe((PredictionEvent)=>{
  //   if(PredictionEvent){
  //     this.gesture = PredictionEvent.getPrediction();
  //   }})
  //   console.log(this.gesture);
  // }
  ngOnInit() {
    // this.home.comPrediction
    // .subscribe((data:string) => {
    //   console.log('Event message from Component A: ' + data);
    // });
  }
  

//   ngOnChanges(changes: { [property: string]: SimpleChange }) {
//     console.log('are u even in here');
//     // Extract changes to the input property by its name
//     let change: SimpleChange = changes['gesture']; 
//     console.log(change);
//     // Whenever the data in the parent changes, this method gets triggered
//     // You can act on the changes here. You will have both the previous
//     // value and the  current value here.
// }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    // localStorage.setItem('gesture', this.gesture);
    // console.log('hi');
    if(this.profile_link) {
      if(this.gesture == "Two Open Hands") {
      window.location.href = this.profile_link;
      }
    }
  }
  loadAboutMe() {
    this.spotifyService.aboutMe().then(data=>{
      this.name = data.name;
      this.profile_pic = data.imageURL;
      this.profile_link = data.spotifyProfile;
    });    
  }

}
