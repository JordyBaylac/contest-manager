import { Competitor } from './../competitor/competitor.model';
import { CompetitorService } from './../competitor/competitor.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.css']
})
export class CompetitorListComponent implements OnInit {

  @Input()
  competitors: Competitor[]

  five_competitors: Competitor[]

  @Input()
  edit: boolean = false;

  @Output()
  onEdit = new EventEmitter<Competitor>()

  constructor(private _competitorService: CompetitorService, 
              private _route: ActivatedRoute) { }
  
  ngOnInit() {
    // 
    // this._route.url.filter( e => e && e.length >= 2 && e[1].path == 'ranking').map(e => true)
    //   .subscribe( e=> {
    //     console.log('Ranking!')
    //     if(e){
      if(!this.edit){
        console.log('sin editar');
        this.competitors = this._competitorService.getSortedCompetitors();
        let fiveIndex = this.competitors.length < 5 ? this.competitors.length : 5;
        this.five_competitors = this.competitors.slice(0,fiveIndex);
        
        setInterval( () => {
          this.competitors = this._competitorService.getSortedCompetitors();
          fiveIndex = this.competitors.length < 5 ? this.competitors.length : 5;
          this.five_competitors = this.competitors.slice(0,fiveIndex);
        }, 3000);
      }
      else
        console.log('editando')
      //   }
      // });
    // console.log('this._route.pathFromRoot',this._route.pathFromRoot.toString());
  }

  ngOnChange(){
    
  }

  notifySelected(competitor: Competitor){
    if(this.edit){
      window.location.hash = '#competitor-form';
      this.onEdit.emit(competitor);
    }
  }

}
