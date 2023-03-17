import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PredictionEvent } from 'src/app/prediction-event';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
  gesture:string;
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];
  i: number = 0;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.spotifyService.getTrack(this.trackId).then(data=>{
      this.track = data;
    });
    this.spotifyService.getAudioFeaturesForTrack(this.trackId).then(data=>{
      this.audioFeatures = data;
    });
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    // localStorage.setItem('gesture', this.gesture);
    if(this.gesture == "Two Open Hands") {
      //window.location.href = 'https://open.spotify.com/user/31by4hs6trtycq5feotdj2jskhrq';
      if(this.track) {
        window.location.href = this.track.url;
      }
    }
    else if(this.gesture == "Two Closed Hands") {
      window.location.href = "/"
    }
    else if(this.gesture == "Open Hand") {
      window.location.href = "/artist/" + this.track.artists[this.i].id;
    }
    else if(this.gesture == "One Open Hand and One Closed Hand") {
      window.location.href = "/album/" + this.track.album.id;
    }
    else if(this.gesture == "Hand Pointing") {
      this.i++;
      if(this.i > this.track.artists.length-1) {
        this.i = 0;
      }
      this.gesture = "Hand Pointing - " + (this.i+1);
    }
  }

}
