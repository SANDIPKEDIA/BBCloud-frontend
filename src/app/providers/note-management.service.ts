import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { environment } from "../../environments/environment";


@Injectable()

export class NoteManagementService {
  public baseUrl=''
 

    
    private result:any;

    constructor(private _http: HttpClient){
      this.baseUrl = environment.baseUrl;
    }

    getFolders(): Observable<any> {
      return this._http.get(this.baseUrl+'/api/v1/getallfolder?type=NOTES').pipe(
        tap(
          response => { console.log("get folder management : successfull"); },
          error => { console.log("get folder management : failed"); }
        )
      );
    }
    
    getFolderNotes(folderId: String): Observable<any> {
      return this._http.get(this.baseUrl+'/api/v1/allnotes?&folder_id=' + folderId).pipe(
        tap(
          response => { console.log("get notes management : successfull"); },
          error => { console.log("get notes management : failed"); }
        )
      );
    }
    
    deleteNote(noteId:String): Observable<any> {
      return this._http.delete(this.baseUrl+`/api/v1/deletenotes/` + noteId).pipe(
        tap(
          response => { 
            console.log("delete note id : " + noteId + "success"); 
            true;
          },
          error => { 
            console.log("delete note id : " + noteId + "failed"); 
            false;
          }
        )
      );
    }

    createFolder(payload): Observable<any> {
      return this._http.post(this.baseUrl+`/api/v1/createfolder`, payload).pipe(
        tap(
          response => { console.log("create folder : successfull"); },
          error => { console.log("create folder : failed"); }
        )
      );
    }

    createNote(payload): Observable<any> {
      return this._http.post(this.baseUrl+`/api/v1/createnotes`, payload).pipe(
        tap(
          response => { console.log("create note : successfull"); },
          error => { console.log("create note : failed"); }
        )
      );
    }

    updateFolder(folderId, payload): Observable<any> {
      return this._http.put(this.baseUrl+`api/v1/editfolder/` + folderId, payload).pipe(
        tap(
          response => { console.log("update folder : successfull"); },
          error => { console.log("update folder : failed"); }
        )
      );
    }

    updateNote(noteId, payload): Observable<any> {
      return this._http.put(this.baseUrl+`/api/v1/editnotes/` + noteId, payload).pipe(
        tap(
          response => { console.log("update note : successfull"); },
          error => { console.log("update note : failed"); }
        )
      );
    }

    updateTraining(noteId, payload): Observable<any> {
      return this._http.put(this.baseUrl+`/api/v1/edittraining/` + noteId, payload).pipe(
        tap(
          response => { console.log("update Training : successfull"); },
          error => { console.log("update Training : failed"); }
        )
      );
    }


    createTraining(payload): Observable<any> {
      return this._http.post(this.baseUrl+`/api/v1/createdoc`, payload).pipe(
        tap(
          response => { console.log("Training note : successfull"); },
          error => { console.log("Training note : failed"); }
        )
      );
    }


    deleteTraining(noteId:String): Observable<any> {
      return this._http.delete(this.baseUrl+`/api/v1/deletedoc/` + noteId).pipe(
        tap(
          response => { 
            console.log("delete Training id : " + noteId + "success"); 
            true;
          },
          error => { 
            console.log("delete noTrainingte id : " + noteId + "failed"); 
            false;
          }
        )
      );
    }
    getTraining(folderId: String): Observable<any> {
      return this._http.get(this.baseUrl+'/api/v1/alldoc?&folder_id=' + folderId).pipe(
        tap(
          response => { console.log("get Doc management : successfull"); },
          error => { console.log("get Doc management : failed"); }
        )
      );
    }
    

}