import { Competitor } from './../competitor/competitor.model';
import { CompetitorService } from './../competitor/competitor.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-competitor',
  templateUrl: './create-competitor.component.html',
  styleUrls: ['./create-competitor.component.css']
})
export class CreateCompetitorComponent implements OnInit {

  @Input()
  competitor: Competitor

  @Output()
  onSaveEvent = new EventEmitter<Competitor>()

  @Output()
  onEditEvent = new EventEmitter<Competitor>()

  competitorForm: FormGroup
  competitorName: FormControl
  competitorResult  : FormControl
  competitorId  : FormControl

  buttonText: string = "Save"

  constructor(private _competitorService: CompetitorService) { }

  ngOnInit() {
    // this.competitors = this._competitorService.getCompetitors();
    this.competitorName      = new FormControl('', [Validators.required,
                                                    Validators.maxLength(128)]);
    this.competitorResult   = new FormControl('', [Validators.required, 
                                                   Validators.maxLength(10)]);
    this.competitorId = new FormControl('', [Validators.maxLength(64)]);

    this.competitorForm = new FormGroup({
        competitorName:    this.competitorName,
        competitorResult:      this.competitorResult,
        competitorId: this.competitorId
    });

  }

  save(formValues : {competitorId: number, competitorName: string, competitorResult: number}){

    console.log('formValues:,', formValues)

    if(!!!formValues.competitorName || !!!formValues.competitorResult){
      console.error("no es posible insertar competidores sin valores");
      return;
    }
    let isNew = true;
    if(formValues.competitorId){
      console.log('recibido un id, seguro fue para editar: ' + formValues.competitorId)
      isNew = false;
    }

    let competitor: Competitor = {
      id: formValues.competitorId ? formValues.competitorId : -1,
      name: formValues.competitorName,
      timeResult: formValues.competitorResult
    }
   
    if(isNew)
      this.onSaveEvent.emit(this._competitorService.saveCompetitor(competitor));
    else{
      this.onEditEvent.emit(this._competitorService.saveCompetitor(competitor));
      this.competitor = null;
      this.buttonText = 'Save';
    }
    this.clearControls();
  }

  ngOnChanges(){
    if(this.competitor){
      console.log('Competitor selected and passed here is:',this.competitor);
      this.competitorName.setValue(this.competitor.name);
      this.competitorResult.setValue(this.competitor.timeResult);
      this.competitorId.setValue(this.competitor.id);
      this.buttonText = 'Edit';
      this.competitorForm.markAsTouched();
    }
    
  }

  private clearControls(){
    if(this.buttonText == 'Save'){
      this.competitorId.setValue(undefined);
      this.competitorId.markAsUntouched();
    }
    this.competitorName.setValue(undefined);
    this.competitorName.markAsUntouched();
    this.competitorResult.setValue(undefined);
    this.competitorResult.markAsUntouched();
  }

  


}
