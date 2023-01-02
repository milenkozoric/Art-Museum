import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artwork } from '../model/artwork.model';
import { Exibition } from '../model/exibition.model';
import { MuseumLocation } from '../model/location.model';

const baseUrl = "http://localhost:3000/api"

@Injectable({
  providedIn: 'root'
})
export class ExibitionService {

  constructor(private http: HttpClient) { }

  getExibitions(): Observable<Exibition[]> {
    return this.http.get(`${baseUrl}/exibitions`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Exibition(elem));
    }))
  }

  getExibition(exibitionId: number): Observable<Exibition> {
    return this.http.get(`${baseUrl}/exibitions/${exibitionId}`).pipe(map((data: any) => {
      return new Exibition(data);
    }))
  }

  getArtworks(params?:any): Observable<Artwork[]> {
    let options = {}
    if (params) {
      options = {
        params: new HttpParams()
          .set("sort", params.sort || "")
          .set("sortDirection", params.sortDirection || "")
          .set("filter", params.filter && JSON.stringify(params.filter) || "")
      }
    }
    return this.http.get(`${baseUrl}/artworks`, options).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Artwork(elem));
    }))
  }

  getExibitionArtworks(exibitionId: number, params?:any): Observable<Artwork[]> {
    return this.http.get(`${baseUrl}/exibitions/${exibitionId}/artworks`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Artwork(elem));
    }))
  }
  
  getLocations(): Observable<MuseumLocation[]> {
    return this.http.get(`${baseUrl}/locations`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new MuseumLocation(elem));
    }))
  }

  postExibition(exibition: Exibition): Observable<Exibition> {
    return this.http.post(`${baseUrl}/exibitions`, exibition).pipe(map((data: any) => {
      return new Exibition(data);
    }))
  }

  addArtwork(exibitionId: number, artworkId: number): Observable<Artwork> {
    return this.http.put(`${baseUrl}/exibitions/${exibitionId}/artworks/${artworkId}`, {}).pipe(map((data: any) => {
      return new Artwork(data);
    }))
  }

  
  removeArtwork(exibitionId: number, artworkId: number): Observable<Artwork> {
    return this.http.delete(`${baseUrl}/exibitions/${exibitionId}/artworks/${artworkId}`).pipe(map((data: any) => {
      return new Artwork(data);
    }))
  }

  
}
