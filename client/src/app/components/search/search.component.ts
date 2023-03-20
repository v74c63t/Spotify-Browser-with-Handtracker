import { Component, OnInit, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { PredictionEvent } from 'src/app/prediction-event';
import { CarouselCardComponent } from '../carousel-card/carousel-card.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  gesture:string = "";
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  k: number=0; // track index
  i: number=0; // artist index
  j: number=0; // album index

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    // localStorage.setItem('gesture', this.gesture);
    // console.log('hi');
    if(this.gesture == 'Hand Pointing') {
      this.searchCategory = 'artist';
    }
    else if(this.gesture == 'Closed Hand') {
      this.searchCategory = 'album';
    }
    else if(this.gesture == 'One Open Hand and One Hand Pointing') {
      this.searchCategory = 'track';
    }
    else if(this.gesture == 'One Open Hand and One Closed Hand') {
      if(this.searchString) {
        this.search();
      }
    }
    if(this.resources[0].category == 'track') {
      if(this.gesture == 'Two Hands Pointing') {
        this.k++;
        if(this.k > this.resources.length-1){
          this.k = 0;
        }
        this.gesture = "Two Hands Pointing - " + (this.k+1);
      }
      if(this.gesture == 'Two Closed Hands') {
        this.k--;
        if(this.k < 0) {
          this.k = this.resources.length-1;
        }
        this.gesture = "Two Closed Hands - " + (this.k+1);
      }
      if(this.gesture == "Open Hand") {
        window.location.href = "/track/" + this.resources[this.k].id;
      }
    }
    if(this.resources[0].category == 'artist') {
      if(this.gesture == 'Two Hands Pointing') {
        this.i++;
        if(this.i > this.resources.length-1){
          this.i = 0;
        }
        this.gesture = "Two Hands Pointing - " + this.resources[this.i].name;
      }
      if(this.gesture == 'Two Closed Hands') {
        this.i--;
        if(this.i < 0) {
          this.i = this.resources.length-1;
        }
        this.gesture = "Two Closed Hands - " + this.resources[this.i].name;
      }
      if(this.gesture == "Open Hand") {
        window.location.href = "/artist/" + this.resources[this.i].id;
      }
    }
    if(this.resources[0].category == 'album') {
      if(this.gesture == 'Two Hands Pointing') {
        this.j++;
        if(this.j > this.resources.length-1){
          this.j = 0;
        }
        this.gesture = "Two Hands Pointing - " + this.resources[this.j].name;
      }
      if(this.gesture == 'Two Closed Hands') {
        this.j--;
        if(this.j < 0) {
          this.j = this.resources.length-1;
        }
        this.gesture = "Two Closed Hands - " + this.resources[this.j].name;
      }
      if(this.gesture == "Open Hand") {
        window.location.href = "/album/" + this.resources[this.j].id;
      }
    }
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    // when the search button or the enter key is pressed,  the function takes the search string and the search category
    // that are inputted by the user to make a search in spotify and get the results
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then(data=>{
      this.resources = data;
    });
  }

}
