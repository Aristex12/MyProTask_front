//AUTHORS: Anas Rami
import { Component } from '@angular/core';
import { Characteristic } from 'src/app/models/characteristic';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/servicios/Users/users.service';
import { ProjectService } from 'src/app/servicios/project/project.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  characteristics: Characteristic[] = [];
  user: User | null = null;
  userpfp:string=''
  idUser: any;
  Allcharacteristics: Characteristic[] = [];
  uploadPercentCv: any;
  uploadPercentPf: any;
  downloadURL: any;
  fileCV: File | null = null;
  filePf: File | null = null;

  constructor(
    private userservice: UsersService,
    private projectservice: ProjectService,
    private storage: AngularFireStorage
  ) {}
 
  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');
    console.log(this.idUser)
    this.fetchData();
    console.log(this.userpfp)
  }
  
getNewDesc(){
  const newdesc = (document.getElementById("desc") as HTMLTextAreaElement).value;
  console.log(newdesc);
  this.userservice.updateDescription(newdesc).subscribe(
    response => {
      this.openDialog()
      setTimeout(() => {
        window.location.reload();
      }, 400);
    },
    error => {
      console.error('Error actualizando la descripcion', error);
    }
  );

}
addUserCharacteristicTec(){
  let char:any = (document.getElementById("tecnologias") as HTMLSelectElement).value;
  let exp:any = (document.getElementById("tecnologias-exp") as HTMLInputElement).value;
  char= parseInt(char)
  exp=parseInt(exp)
  this.userservice.addUserCharacteristics(char,exp).subscribe(
    response => {
      this.openDialog()
      setTimeout(() => {
        window.location.reload();
      }, 400);
    },
    error => {
      console.error('Error', error);
    }
  );
}
addUserCharacteristicLang(){
  let char:any = (document.getElementById("languages") as HTMLSelectElement).value;
  let exp:any = (document.getElementById("languages-exp") as HTMLInputElement).value;
  char= parseInt(char)
  exp=parseInt(exp)
  this.userservice.addUserCharacteristics(char,exp).subscribe(
    response => {
      this.openDialog()
      setTimeout(() => {
        window.location.reload();
      }, 400);
    },
    error => {
      console.error('Error', error);
    }
  );
}
  fetchData() {
    this.userservice.getUserCharacteristics().subscribe(
      (data: Characteristic[]) => {
        this.characteristics = data;
      },
      (error) => {
        console.error('Error fetching user characteristics:', error);
      }
    );

    this.userservice.getUserById(this.idUser).subscribe(
      (data: User) => {
        this.user = data;
        this.userpfp=this.user.profilePic
        console.log(this.userpfp);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.projectservice.getAllCharacteristics().subscribe(
      (data: Characteristic[]) => {
        this.Allcharacteristics = data;
      },
      (error) => {
        console.error('Error fetching all characteristics:', error);
      }
    );
  }
  deleteCharacteristic(idchar:any){

    this.userservice.deleteCharacteristicbyIdUser(idchar).subscribe(
      response => {
        this.openDialog()
        setTimeout(() => {
          window.location.reload();
        }, 400);
      },
      error => {
        this.openDialog()
        setTimeout(() => {
          window.location.reload();
        }, 400);
      },
      

    );
  }

  getPlaceholderText() {
    return this.fileCV ? this.fileCV.name : "No seleccionado CV";
  }

  getPlaceholderText2() {
    return this.filePf ? this.filePf.name : "No seleccionado CV";
  }

  uploadCv(event: any) {
    this.fileCV = event.target.files[0];
 
  }

  uploadPf(event: any) {
    this.filePf = event.target.files[0];
  }

  uploadFiles() {
    if (this.fileCV) {
      const newFileName='curriculum.pdf'
      const cvFilePath = `user-profiles/${this.idUser}/${newFileName}`;
      const cvFileRef = this.storage.ref(cvFilePath);
      const cvTask = this.storage.upload(cvFilePath, this.fileCV);

      cvTask.snapshotChanges().pipe(
        finalize(() => {
          
          cvFileRef.getDownloadURL().subscribe((cvUrl: string) => {
            if (cvUrl) {
              console.log('CV File URL:', cvUrl);
              console.log(this.fileCV?.name)
              this.userservice.updateCV(this.fileCV?.name).subscribe(
                response => {
                  this.openDialog()
                  setTimeout(() => {
                    window.location.reload();
                  }, 400);
                },
                error => {
                  console.error('Error actualizando el CV', error);
                }
              );
              // Aquí puedes hacer lo que necesites con la URL del CV
            }
          });
        })
      ).subscribe();
    }

    if (this.filePf) {
      const newFileName2='pfp.png'
      console.log(this.idUser)
      const pfFilePath = `user-profiles/${this.idUser}/${newFileName2}`;
      const pfFileRef = this.storage.ref(pfFilePath);
      const pfTask = this.storage.upload(pfFilePath, this.filePf);

      pfTask.snapshotChanges().pipe(
        finalize(() => {
          pfFileRef.getDownloadURL().subscribe((pfUrl: string) => {
            if (pfUrl) {
              console.log('Profile Picture URL:', pfUrl);
              this.userservice.updateProfilePic(this.filePf?.name).subscribe(
                response => {
                  this.openDialog()
                  setTimeout(() => {
                    window.location.reload();
                  }, 400);
                },
                error => {
                  console.error('Error actualizando el CV', error);
                }
              );
            }
          });
        })
      ).subscribe();
    }
  }

  showDialog: boolean = false;

  openDialog(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }
}
