import { Component, OnInit } from '@angular/core';
import { KieService } from '../kie.service';
import { MessageService } from '../message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
  filename: string;
  selectedLevel;
  data:Array<Object> = [
      {id: 0, name: "Macbook Pro"},
      {id: 1, name: "Surface Pro"},
      {id: 1, name: "Chromebook"}
  ];

  constructor(private kieService: KieService, private messageService: MessageService, private router: Router) {
   }

  submit() {
    this.kieService.startProcess(this.selectedLevel.name).subscribe(res => {
      this.messageService.success(`Process ${res} started`);
      this.router.navigate(['/home/process']);
    });
  }

  selected(){
    alert(this.selectedLevel.name)
  }

  ngOnInit() {
  }

}