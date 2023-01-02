import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exibition } from 'src/app/model/exibition.model';
import { MuseumLocation } from 'src/app/model/location.model';
import { ExibitionService } from 'src/app/services/exibition.service';

@Component({
  selector: 'app-exibition-form',
  templateUrl: './exibition-form.component.html',
  styleUrls: ['./exibition-form.component.css']
})
export class ExibitionFormComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    locationId: new FormControl(0)
  })

  locations: MuseumLocation[] = [];

  constructor(
    private service: ExibitionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.service.getLocations().subscribe({
      next: (locations: MuseumLocation[]) => {
        this.locations = locations;
      },
      error: (err: any) => console.log(err)
    })
  }

  addExibition(): void {
    console.log(this.form.value)
    let location = this.locations.find((elem: MuseumLocation) => elem._id == this.form.value.locationId)
    if (!this.form.valid || !location) {
      alert("Please fill in the form")
      return
    }
    let exibit = new Exibition(this.form.value);
    exibit.location = location;

    this.service.postExibition(exibit).subscribe({
      next: (exibition: Exibition) => {
        console.log(exibition)
        this.router.navigate(['/exibitions'])
      },
      error: (err: any) => console.log(err)
    })

  }

}
