import { Competitor } from './competitor.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CompetitorService {

  constructor() { }

  getSortedCompetitors(){
    let competitors: Competitor[] = [];
    this.getCompetitors().forEach(element => {
            let newElem: any = [];
            newElem.id = element.id;
            newElem.name = element.name;
            newElem.timeResult = element.timeResult;
            competitors.push(newElem);
     });

     competitors.sort( (a, b) => {
         return a.timeResult - b.timeResult;
     });
     return competitors;
  }

  getCompetitors(): Competitor[]{

    let comps = localStorage.getItem('COMPETITORS')
    if(comps != null){
      console.log('hay competitors!')
      return JSON.parse(comps);
    }

    return [];
  }

  private getRandomArbitrary(min, max): number {
    return Math.random() * (max - min) + min;
  }

  saveCompetitor(competitor: Competitor): Competitor{
    let comps = localStorage.getItem('COMPETITORS')
    if(!!!comps){
      console.log('local storage competitors is null')
      localStorage.setItem('COMPETITORS', JSON.stringify([]));
      comps = localStorage.getItem('COMPETITORS')
    }

    if(comps){
      let jcomps = JSON.parse(comps);
      if(competitor.id === -1){
        let newId = this.getRandomArbitrary(99, 999999);
        competitor.id = newId;
        console.log('adding competitor:', competitor);
        jcomps.push(competitor);
      }
      else{
        console.log('editing competitor:', competitor);
        let index = jcomps.findIndex(comp => comp.id == competitor.id);
        jcomps[index] = competitor;
      }
      
      
      localStorage.setItem('COMPETITORS', JSON.stringify(jcomps));
      return competitor;
    }

    return null;
  }

}
