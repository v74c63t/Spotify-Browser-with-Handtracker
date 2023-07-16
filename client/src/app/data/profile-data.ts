export class ProfileData {
	name:string;
	spotifyProfile:string;
	imageURL:string;

	constructor(objectModel:{}) {
		this.name = objectModel['display_name'];
		this.spotifyProfile = objectModel['external_urls']['spotify'];
		if(objectModel['images'].length > 0) {
			if(objectModel['images'].length == 2) {
				this.imageURL = objectModel['images'][1].url;
			}
			else {
				this.imageURL = objectModel['images'][0].url;
			}
		} else {
			this.imageURL = '../../assets/unknown.jpg';
		}
	}
}
