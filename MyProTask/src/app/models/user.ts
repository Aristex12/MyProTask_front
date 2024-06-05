export interface User {
    idUser:number,
    name:string,
    lastName:string,
    das:string,
    email:string,
    profilePic:string,
    cv:string,
    description:string,
    awg:number
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
