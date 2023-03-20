import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PredictionEvent } from 'src/app/prediction-event';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
  gesture:string;
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  k:number = 0;
  i:number = 0;
  j:number = 0;
  toggle:string = "Track";

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then(data=>{
      this.artist = data;
    });
    this.spotifyService.getRelatedArtists(this.artistId).then(data=>{
      this.relatedArtists = data;
    });
    this.spotifyService.getTopTracksForArtist(this.artistId).then(data=>{
      this.topTracks = data;
    });
    this.spotifyService.getAlbumsForArtist(this.artistId).then(data=>{
      this.albums = data
    });

  }
  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    if(this.gesture == "Two Open Hands") {
      if(this.artist) {
        window.location.href = this.artist.url;
      }
    }
    else if(this.gesture == "Two Closed Hands") {
      window.location.href = "/"
    }
    else if(this.gesture == "Closed Hand") {
      if(this.toggle == "Track") {
        this.toggle = "Album";
      }
      else if(this.toggle == "Album") {
        this.toggle = "Artist";
      }
      else if(this.toggle == "Artist") {
        this.toggle = "Track";
      }
    }
    if(this.toggle == "Track") {
      if(this.gesture == "Two Hands Pointing") {
        this.k++;
        if(this.k > this.topTracks.length-1){
          this.k = 0;
        }
        this.gesture = "Two Hands Pointing - " + (this.k+1);
      }
      if(this.gesture == "One Open Hand and One Hand Pointing") {
        this.k--;
        if(this.k < 0){
          this.k = this.topTracks.length-1;
        }
        this.gesture = "One Open Hand and One Hand Pointing - " + (this.k+1);
      }
      if(this.gesture == "Open Hand") {
        window.location.href = "/track/" + this.topTracks[this.k].id;
      }
    }
    if(this.toggle == "Artist") {
      if(this.gesture == "Two Hands Pointing") {
        this.i++;
        if(this.i > this.relatedArtists.length-1){
          this.i = 0;
        }
        this.gesture = "Two Hands Pointing - " + this.relatedArtists[this.i].name;
      }
      if(this.gesture == "One Open Hand and One Hand Pointing") {
        this.i--;
        if(this.i < 0){
          this.i = this.relatedArtists.length-1;
        }
        this.gesture = "One Open Hand and One Hand Pointing - " + this.relatedArtists[this.i].name;
      }
      if(this.gesture == "Open Hand") {
        window.location.href = "/artist/" + this.relatedArtists[this.i].id;
      }
    }
    if(this.toggle == "Album") {
      if(this.gesture == "Two Hands Pointing") {
        this.j++;
        if(this.j > this.albums.length-1){
          this.j = 0;
        }
        this.gesture = "Two Hands Pointing - " + this.albums[this.j].name;
      }
      if(this.gesture == "One Open Hand and One Hand Pointing") {
        this.j--;
        if(this.j < 0){
          this.j = this.albums.length-1;
        }
        this.gesture = "One Open Hand and One Hand Pointing - " + this.albums[this.j].name;
      }
      if(this.gesture == "Open Hand") {
        window.location.href = "/album/" + this.albums[this.j].id;
      }
    }
  }

}