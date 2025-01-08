import { UserRoleType } from "./userRoleType";


export type CompanyType = {
    name?: string,
    pic?: string,
    description?: string,
    address?: string,
    phone?: string,
    email: string,
    uid: string,
    role: UserRoleType,
    
}