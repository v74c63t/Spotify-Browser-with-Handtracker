import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() audioFeature:string;
	@Input() percentage:number;
  @Input() color;
  constructor() { }

  ngOnInit() {
  }

}
