import { Component } from '@angular/core';

 
@Component({
  selector: 'app-project-users-pm',
  templateUrl: './project-users-pm.component.html',
  styleUrls: ['./project-users-pm.component.css']
})
export class ProjectUsersPmComponent {
  terminoBusqueda: string = "";
  openModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "block";
    }
  }
 
  closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "none";
    }
  }
  openModal2() {
    const modal = document.getElementById("modal2");
    if (modal) {
      modal.style.display = "block";
    }
  }
 
  closeModal2() {
    const modal = document.getElementById("modal2");
    if (modal) {
      modal.style.display = "none";
    }
  }
  projects = [
    {
      name: 'Project 1',
      users: [
        {
          idUser: 1,
          profilePic: 'profile1.jpg',
          name: 'User One',
          email: 'user1@example.com',
          das: 'DAS123'
        },
        {
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },
        {
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },
        {
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },
        {
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },
        {
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },{
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },{
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },{
          idUser: 2,
          profilePic: 'profile2.jpg',
          name: 'User Two',
          email: 'user2@example.com',
          das: 'DAS456'
        },
      ]
    },
 
  ];
}
(window as any).projectUsers = new ProjectUsersPmComponent();