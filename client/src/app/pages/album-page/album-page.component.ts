import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PredictionEvent } from 'src/app/prediction-event';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
  gesture:string;
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];
  i:number = 0;
  k:number = 0;


  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id');
  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album
    this.spotifyService.getAlbum(this.albumId).then(data=>{
      this.album = data;
    });
    this.spotifyService.getTracksForAlbum(this.albumId).then(data=>{
      this.tracks = data;
    });
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    // localStorage.setItem('gesture', this.gesture);
    if(this.gesture == "Two Open Hands") {
      //window.location.href = 'https://open.spotify.com/user/31by4hs6trtycq5feotdj2jskhrq';
      if(this.album) {
        window.location.href = this.album.url;
      }
    }
    else if(this.gesture == "Two Closed Hands") {
      window.location.href = "/"
    }
    else if(this.gesture == "Open Hand") {
      window.location.href = "/artist/" + this.album.artists[this.i].id;
    }
    else if(this.gesture == "One Open Hand and One Closed Hand") {
      window.location.href = "/track/" + this.tracks[this.k].id;
    }
    else if(this.gesture == "Hand Pointing") {
      this.i++;
      if(this.i > this.album.artists.length-1) {
        this.i = 0;
      }
      this.gesture = "Hand Pointing - " + (this.i+1);
    }
    else if(this.gesture == "Two Hands Pointing") {
      this.k++;
      if(this.k > this.tracks.length-1){
        this.k = 0;
      }
      this.gesture = "Two Hands Pointing - " + (this.k+1);
    }
  }

}
