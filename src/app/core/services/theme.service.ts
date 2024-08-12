import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from './';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme
  uiConfig: any
  constructor(private restService: RestService) { }

  fetchThemes(){
    return this.restService.get(environment.API_HOST+'/configs').pipe(
      tap((res) => {
        this.uiConfig = res;
        this.uiConfig.themes.sort((a, b)=>(a.srNo-b.srNo))
      })
    );
  }
  getUiConfig(){
    return this.uiConfig
  }
  getSelectedThemes(){
    return this.selectedTheme
  }
  setSelectedThemes(theme){
    this.selectedTheme=theme
  }
  
}
