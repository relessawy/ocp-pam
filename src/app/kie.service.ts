import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MessageService } from './message/message.service';
import { Observable, of } from 'rxjs/index';

const baseUrl = '/services/rest';
const processId = 'procurement-process';
const containerId = 'procurement-process_1.0.0-SNAPSHOT';
const user = 'pamAdmin';
const password = 'redhatpam1!'

const headers: HttpHeaders = new HttpHeaders()
  .append('Content-Type', 'application/json')
  .append('Authorization', 'Basic ' + btoa(`${user}:${password}`));

const httpOptions: any = {
  headers: headers
};

@Injectable({
  providedIn: 'root'
})
export class KieService {
  constructor(private messageService: MessageService, private http: HttpClient) { }

  startProcess(filename: string): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/processes/${processId}/instances`;
    const body = {
      laptop: filename
    };
    
    return this.http.post<any>(url, body, httpOptions).pipe(
      catchError(res => this.handleError('process()', res))
    );
  }

  getProcesses(): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/processes/instances`;
    return this.http.get<any>(url, httpOptions).pipe(
      catchError(res => this.handleError('getProcesses()', res))
    );
  }

  getImage(processInstanceId: string) {
    const url = `${baseUrl}/server/containers/${containerId}/images/processes/instances/${processInstanceId}`;
    httpOptions.responseType = 'text' as 'text';

    return this.http.get(url, httpOptions).pipe(
      catchError(res => this.handleError('getImage()', res))
    )
  }

  getTasks(): Observable<any> {
    const url = `${baseUrl}/server/queries/tasks/instances/pot-owners`;
    return this.http.get<any>(url, httpOptions).pipe(
      catchError(res => this.handleError('getTasks()', res))
    );
  }

  getTask(taskInstanceId: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskInstanceId}/contents/input`;
    return this.http.get<any>(url, httpOptions).pipe(
      catchError(res => this.handleError('getTask()', res))
    );
  }

  claim(taskInstanceId: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskInstanceId}/states/claimed`;
    return this.http.put<any>(url, null, httpOptions).pipe(
      catchError(res => this.handleError('claim()', res))
    );
  }

  start(taskInstanceId: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskInstanceId}/states/started`;
    return this.http.put<any>(url, null, httpOptions).pipe(
      catchError(res => this.handleError('start()', res))
    );
  }

  complete(taskInstanceId: number): Observable<any> {
    const url = `${baseUrl}/server/containers/${containerId}/tasks/${taskInstanceId}/states/completed`;

    return this.http.put<any>(url, null, httpOptions).pipe(
      catchError(res => this.handleError('complete()', res))
    );
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
