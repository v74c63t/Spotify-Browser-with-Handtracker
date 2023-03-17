import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { PredictionEvent } from 'src/app/prediction-event';

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
    else if(this.gesture == 'Two Hands Pointing') {
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
  }

  // ngOnChange(changes: SimpleChanges) {
  //   console.log(changes['gesture'].currentValue);
  //   smdjaslkfjads;KeyValueDiffers;dslkfjsd;f
  // }

  search() {
    //TODO: call search function in spotifyService and parse response
    // when the search button or the enter key is pressed,  the function takes the search string and the search category
    // that are inputted by the user to make a search in spotify and get the results
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then(data=>{
      this.resources = data;
    });
  }

}
