import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Artwork } from 'src/app/model/artwork.model';
import { Exibition } from 'src/app/model/exibition.model';
import { MuseumLocation } from 'src/app/model/location.model';
import { ExibitionService } from 'src/app/services/exibition.service';

@Component({
  selector: 'app-exibition-details',
  templateUrl: './exibition-details.component.html',
  styleUrls: ['./exibition-details.component.css']
})
export class ExibitionDetailsComponent implements OnInit {

  exibitionId: number = 0;
  exibition: Exibition = new Exibition();

  artworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];
  exibitionArtworks: Artwork[] = [];

  edit = false;

  params = {
    sort: "author",
    sortDirection: "asc",
    filter: {
      author: ""
    }
  }

  constructor(
    private route: ActivatedRoute,
    private service: ExibitionService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.exibitionId = params['id'];
      this.getExibition();
      this.getArtworks();
      this.getExibitionArtworks();
    })
  }

  getExibition(): void {
    this.service.getExibition(this.exibitionId).subscribe({
      next: (exibtion: Exibition) => {
        this.exibition = exibtion
      },
      error: (err: any) => console.log(err)
    })
  }

  

  getArtworks(): void {
    this.service.getArtworks(this.params).subscribe({
      next: (artworks: Artwork[]) => {
        this.artworks = artworks
        this.filterArtworks();
      },
      error: (err: any) => console.log(err)
    })
  }

  getExibitionArtworks(): void {
    this.service.getExibitionArtworks(this.exibitionId).subscribe({
      next: (artworks: Artwork[]) => {
        this.exibitionArtworks = artworks
        this.filterArtworks();
      },
      error: (err: any) => console.log(err)
    })
  }

  onEditChange(): void {
    this.edit = true;
  }

  onDone(): void {
    this.edit = false;
  }

  filterArtworks(): void {
    this.filteredArtworks = this.artworks.filter((art: Artwork) => {
      if (this.exibitionId === 0) return 
      return art.exibition_id < 0
    })
  }

  onAddArtwork(artworkId: number): void {
    this.service.addArtwork(this.exibitionId, artworkId).subscribe({
      next: (artwork: Artwork) => {
        this.exibitionArtworks.push(artwork);
        this.getArtworks();
      },
      error: (err: any) => console.log(err)
    })
  }

  onRemoveArtwork(artworkId: number): void {
    this.service.removeArtwork(this.exibitionId, artworkId).subscribe({
      next: (artwork: Artwork) => {
        let ind = this.exibitionArtworks.map((art: Artwork) => art._id).indexOf(artwork._id)
        this.exibitionArtworks.splice(ind, 1)
        this.getArtworks();
      },
      error: (err: any) => console.log(err)
    })
  }


  onSearch(author: string): void {
    this.params.filter.author = author;
    this.getArtworks();
  }


}
