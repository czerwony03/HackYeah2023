import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {

  constructor(
    private readonly httpClient: HttpClient) {
  }


}
