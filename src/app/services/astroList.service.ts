import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { DataTableParams } from '../components/data-table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AstroListingService {

  private baseURL = environment.baseBZURI;
  private fetchUsersURL = this.baseURL + '/astroListV2';
  private fetchUsersByNameURL = this.baseURL + '/astroListByName';
  private createAstroURL = this.baseURL + '/createAstro';
  private updateAstroURL = this.baseURL + '/updateAstro';
  constructor(private http: Http) { }

  private paramsToQueryString(params: DataTableParams) {
    let result = [];
    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }
    return result.map(param => param.join('=')).join('&');
  }

  getAstroList(params: DataTableParams, filterData: any) {
    let _getastroListURL = this.fetchUsersURL;
    _getastroListURL = _getastroListURL + '?' + this.paramsToQueryString(params)
    console.log(_getastroListURL);
    return this.http.get(_getastroListURL)
      .map((response: Response) => {
        let data = response.json();
        return {
          items: data.items,
          count: data.count
      }
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

  }



  getAstroListByName(name: string) {
    let _getastroListURL = this.fetchUsersByNameURL;
    _getastroListURL = _getastroListURL + '?name=' + name;
    return this.http.get(_getastroListURL)
      .map((response: Response) => {
        let data = response.json();
        return data;
      }).catch((error: any) => Observable.throw(error.json().error || 'server error'));

  }

  createAstro(dataObject: any) {
    const formData = new FormData();
    formData.append('firstName', dataObject.fName);
    formData.append('lastName', dataObject.lName);
    formData.append('email', dataObject.email);
    formData.append('contact', dataObject.contactNo);
    formData.append('isActive', dataObject.isActive);
    formData.append('userName', dataObject.name);
    formData.append('password', dataObject.password);
    formData.append('gender', dataObject.gender);
    formData.append('countryId', dataObject.country);
    formData.append('stateId', dataObject.state);
    formData.append('cityId', dataObject.city);
    formData.append('imageFile', dataObject.image);
    formData.append('expertiseIds', dataObject.expertiseItems);
    formData.append('languageIds', dataObject.languageItems);
    formData.append('yearsOfExperience', dataObject.experience);
    formData.append('description', dataObject.description);
    return this.http.post(this.createAstroURL, formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUpdateAstro(dataObject: any) {
    const formData = new FormData();
    formData.append('id', dataObject.id);
    formData.append('firstName', dataObject.fName);
    formData.append('lastName', dataObject.lName);
    formData.append('email', dataObject.email);
    formData.append('contact', dataObject.contactNo);
    //formData.append('active', dataObject.astroStatus);
    formData.append('isActive', dataObject.isActive);
    formData.append('gender', dataObject.gender);
    if(dataObject.country){
        formData.append('countryId', dataObject.country);
    }
    if(dataObject.state){
        formData.append('stateId', dataObject.state);
    }
    if(dataObject.city){
        formData.append('cityId', dataObject.city);
    }
    if(dataObject.image){
        formData.append('imageFile', dataObject.image);
    }
    formData.append('expertiseIds', dataObject.expertiseItems);
    formData.append('languageIds', dataObject.languageItems);
    formData.append('yearsOfExperience', dataObject.experience);
    formData.append('description', dataObject.description);
    return this.http.post(this.updateAstroURL, formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
