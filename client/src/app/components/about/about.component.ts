import { Component, OnInit} from '@angular/core';
import { PredictionEvent } from 'src/app/prediction-event';
import { SpotifyService } from '../../services/spotify.service';

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

  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }
  
  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    if(this.gesture == "Open Hand") {
      this.loadAboutMe();
    }
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
