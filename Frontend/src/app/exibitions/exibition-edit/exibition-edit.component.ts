import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Artwork } from 'src/app/model/artwork.model';

@Component({
  selector: 'app-exibition-edit',
  templateUrl: './exibition-edit.component.html',
  styleUrls: ['./exibition-edit.component.css']
})
export class ExibitionEditComponent implements OnInit {

  @Input()
  artworks: Artwork[] = [];

  @Input()
  exibitionArtworks: Artwork[] = [];

  @Input()
  page: number = 0

  @Output()
  onDone: EventEmitter<boolean> = new EventEmitter();

  @Output()
  onAdd: EventEmitter<number> = new EventEmitter();
  
  @Output()
  onRemove: EventEmitter<number> = new EventEmitter();

  @Output()
  search: EventEmitter<string> = new EventEmitter();


  searchControl = new FormControl("")

  constructor() { }

  ngOnInit(): void {
  }

  onDoneClicked(): void {
    this.onDone.emit(true)
  }

  addArtwork(artId: number): void {
    this.onAdd.emit(artId)
  }

  removeArtwork(artId: number): void {
    this.onRemove.emit(artId)
  }

  onSearch(): void {
    this.search.emit(this.searchControl.value || "")
  }
}
