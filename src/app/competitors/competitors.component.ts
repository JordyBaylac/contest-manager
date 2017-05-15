import { element } from 'protractor';
import { CompetitorService } from './competitor/competitor.service';
import { Competitor } from './competitor/competitor.model';
import { Component } from '@angular/core';
import * as jsPDF from 'jspdf'

@Component({
    selector: 'competitors',
    templateUrl: 'competitors.component.html'
})
export class CompetitorsComponent{

    competitors: Competitor[]
    competitorEditing: Competitor

    constructor(private _service: CompetitorService){}

    ngOnInit(){
        this.competitors = this._service.getCompetitors();
    }

    saveCompetitor(competitor: Competitor, isNew: boolean){
        console.log('recibiendo new competitor:',competitor);
        this.competitors.push(competitor);
    }

    saveEditedCompetitor(competitor: Competitor){
        console.log('recibiendo old competitor:',competitor);
        let index = this.competitors.findIndex(comp => comp.id == competitor.id);
        this.competitors[index] = competitor;
    }

    editingCompetitor(competitor: Competitor){
        console.log('se quiere editar al competitor: ', competitor)
        this.competitorEditing = competitor;
    }

    exportToPdf(ordered: boolean){
 
        

        //Copiando competidores para no modificar los originales!
        let competitors: Competitor[] = [];
        this.competitors.forEach(element => {
            let newElem: any = [];
            newElem.id = element.id;
            newElem.name = element.name;
            newElem.timeResult = element.timeResult;
            competitors.push(newElem);
        });

        if(ordered){
            competitors.sort( (a, b) => {
                return a.timeResult - b.timeResult;
            });
        }

        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(20);
        pdf.setFont("times");
        pdf.setFontType("bold");
        // pdf.setTextColor(255, 0, 0);
        
        if(ordered){
            pdf.text(67,20,'Ranking List');
        }
        else{
            pdf.text(67,20,'Competitors List');
        }
        
        let y = 40;
        pdf.setFontSize(16);
        let pos = 1;

        competitors.forEach(element => {
            if(pos%25==0){
                pdf.addPage();
                y=40;
            }
          pdf.text(15, y, (pos++).toString());
          pdf.text(25, y, element.name);
          pdf.text(150, y, element.timeResult.toString());
          y+=10;
        });
        
        
        pdf.save('Test.pdf');
    }

}