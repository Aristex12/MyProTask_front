import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { Characteristic } from 'src/app/models/characteristic';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { ProjectService } from 'src/app/servicios/project/project.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent {
  selectedOptions: string[] = [];
   projectNameInput :any;
   vacanciesInput:any;
   pmSelect :any;
   finishDateInput:any;
   descriptionTextarea :any;
  newProjectId:any;
  employees: User[] = [];
  characteristics: Characteristic[] = [];
  selectedCharacteristics: any[] = []; // Lista de características seleccionadas
   selectedCharacteristicIds: number[] = [];
  constructor(private usersService: UsersService, private projectservice: ProjectService,private router:Router) { }

  ngOnInit(): void {
      
    this.fetchActiveEmployees();
    this.fetchAllCharacteristics();
    this.projectNameInput = document.getElementById('name') as HTMLInputElement;
    this.vacanciesInput = document.getElementById('vacancies') as HTMLInputElement;
    this.pmSelect = document.getElementById('pm') as HTMLSelectElement;
    this.finishDateInput = document.getElementById('finishDate') as HTMLInputElement;
    this.descriptionTextarea = document.getElementById('description') as HTMLTextAreaElement;
  }

  fetchActiveEmployees(): void {
    this.usersService.displayActiveEmployees().subscribe(
      (data: User[]) => {
        this.employees = data;
        console.log(this.employees);
      },
      (error) => {
        console.error('Error fetching active employees', error);
      }
    );
  }

  fetchAllCharacteristics(): void {
    this.projectservice.getAllCharacteristics().subscribe(
      (data: Characteristic[]) => {
        this.characteristics = data;
        console.log(this.characteristics);
      },
      (error) => {
        console.error('Error fetching characteristics', error);
      }
    );
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedOptions.push(value);
    } else {
      const index = this.selectedOptions.indexOf(value);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
    console.log('Opciones seleccionadas:', this.selectedOptions);
  }
  validateFields(): void {
    // Obtener referencias a los elementos del DOM

    
    // Verificar si todos los elementos existen
    if (this.projectNameInput && this.vacanciesInput && this.pmSelect && this.finishDateInput && this.descriptionTextarea) {
      // Verificar si todos los campos requeridos tienen valor
      const projectName = this.projectNameInput.value;
      const vacancies = this.vacanciesInput.value;
      const pm = this.pmSelect.value;
      const finishDate = this.finishDateInput.value;
      const description = this.descriptionTextarea.value;
 
      if (this.selectedOptions.length === 0) {
        alert('Por favor seleccione al menos una característica.');
        return; // Salir de la función si no se ha seleccionado ninguna característica
      }else{
        if (projectName && vacancies && pm && finishDate && description) {
        // Todos los campos están completos, llamar a la función addProject()
        this.addChar();
        console.log(projectName,vacancies,pm,finishDate,description)
        
       this.addNewProject(projectName,description,vacancies,finishDate,pm);
      } else {
        // Mostrar un mensaje de error o tomar alguna otra acción
        alert('Por favor complete todos los campos requeridos.');
        console.log(projectName,vacancies,pm,finishDate,description)
      }}
      
    } else {
      // Manejar el caso en que no se puedan obtener referencias a todos los elementos del DOM
      console.error('Algunos elementos no existen en el DOM.');
    }
  }
  
  
  
  addChar(): void {

    this.characteristics.forEach(char => {
      const checkbox = document.getElementById(char.name) as HTMLInputElement;
      if (checkbox.checked) {
       this.selectedCharacteristicIds.push(char.idCharacteristic);
      }
    });
    console.log('IDs de características seleccionadas:', this.selectedCharacteristicIds);
    // Aquí puedes hacer lo que necesites con los IDs de las características seleccionadas
  }
  
  addNewProject(projectName:any,description:any,vacancies:any,finishDate:any,pm:any){
    
    this.projectservice.createProject(projectName,description,vacancies,finishDate,this.selectedCharacteristicIds).subscribe({
    next:  (data) => {
this.newProjectId=data
      console.log(this.newProjectId)

      this.projectservice.adPM(pm,this.newProjectId).subscribe({
        next:  (data) => {
          
          console.log(data)
          
          },
         error: (error) => {
          
          },
        complete:()=>{
       
        }
        });

      },
     error: (error) => {
        console.error('Error fetching characteristics', error);
      }
    });
    
    this.router.navigateByUrl("home-projects")
  }

  
}
