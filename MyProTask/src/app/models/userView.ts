import { Project } from 'src/app/models/project';
import { User } from './user';
export interface UserView {
    idUserProject:number,
    Project:{
        idProject: number,
        name: string,
        description: string,
        startDate: Date,
        finishDate: Date,
        vacancies: number,
        status?: string,
    }
    User: {
        idUser:number,
        name:string,
        lastName:string,
        das:string,
        email:string,
        profilePic:string,
        cv:string,
        role: {
            idRole:number,
            name:string
        },
        userCharacteristics: [
            {
                name:string,
                idCaracteristic:number
            },
            {
                name:string,
                idCaracteristic:number
            }
        ],
        active:boolean
    }
    
}