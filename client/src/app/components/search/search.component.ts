import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  @Input() gesture:string;
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
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
