import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DiscussionService {
  apiURL: string = environment.baseUrl;
  moduleURL = environment.discussionUrl;
  constructor(private router: Router, private httpClient: HttpClient) {}

  getAllDiscussions(accessToken: string) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;"
      }
    };

    return this.httpClient
      .get(`${this.apiURL}${this.moduleURL}/getall`, headers)
      .pipe(catchError(this.handleError));
  }

  updateDiscussion(accessToken: string, discussion: any) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;"
      }
    };

    return this.httpClient
      .post(
        `${this.apiURL}${this.moduleURL}/addcomment`,
        discussion,
        headers
      )
      .pipe(catchError(this.handleError));
  }

  addDiscussion(accessToken: string, discussion: any) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;"
      }
    };

    return this.httpClient
      .post(
        `${this.apiURL}${this.moduleURL}/new`,
        discussion,
        headers
      )
      .pipe(catchError(this.handleError));
  }

  getDiscussionById(accessToken: string, discussionId: any) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;"
      }
    };

    return this.httpClient
      .get(
        `${this.apiURL}${this.moduleURL}/getbyId/${discussionId}`,
        headers
      )
      .pipe(catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = "";
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error:${error.error.message}`;
    } else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
