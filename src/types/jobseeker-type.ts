
import { UserRoleType } from "./userRoleType"

export type JobSeekerType = {
    name?: string,
    pic?: string,
    description?: string,
    address?: string,
    phone?: string,
    email: string,
    uid: string,
    role: UserRoleType,
    resume?: string
}