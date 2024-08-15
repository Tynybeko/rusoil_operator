import { UserRolesEnum } from "./enums";



interface IBaseResponse<T> {
  results: T;
  count: number;
  next: string;
  prev: string
  total_pages: number | null
}



interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

interface IInitiaBaseState<T> {
  data: null | T,
  isLoading: boolean,
  isError: boolean
}
interface InitialObjectType {
  [key: string]: any
}

interface ISlice<T> {
  data: null | IBaseResponse<T>;
  isLoading: boolean,
  isError: boolean
}



interface IWorkProccess extends BaseEntity {
  start_time: string;
  end_time: string;
  status: boolean;
  work: IWork
}


interface IWorkSpaces extends BaseEntity {
  "method": string,
  "amount": number,
  "work_proccess": IWorkProccess,
  "client": IUser
}
interface IUser extends BaseEntity {
  "first_name": string,
  "last_name": string,
  "middle_name": string,
  "current_work_procces_id": null | number,
  "get_full_name": string;
  "role": UserRolesEnum,
  "is_active": boolean,
  "password": string,
  "phone": string,
  "client": IClient;
  image: string;
  "last_login": string,
  "last_activity": string,
  "date_joined": string,
  "gender": string,
  "date_of_birth": string,
  "passport_front_side_photo": string,
  "passport_back_side_photo": string,
  "passport_number": string,
  "photo_with_passport": string,
  current_role: string;
  current_position: string;
}


interface Position extends BaseEntity {
  title: string;
  rang: string
}



interface IEmployees extends BaseEntity {
  "role": string,
  "in_work_status": string,
  "user": IUser,
  "position": Position
}

interface IWork extends BaseEntity {
  "note": string,
  "employee": IEmployees,
  "gas_station": GasStations
}

interface GasStations extends BaseEntity {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  access_to_add_balance: boolean
}

interface IOption<T> {
  title: string,
  value: T
}

interface IBonusCard extends BaseEntity {
  "bonus_balance": number,
  "code": string,
  "client": number
}

interface IClient extends BaseEntity {
  "bonus_card": IBonusCard
  "rate": string,
  "is_verify": true
}

export type {
  IInitiaBaseState,
  ISlice,
  IBaseResponse,
  IUser,
  IWork,
  InitialObjectType,
  IWorkSpaces,
  IWorkProccess,
  IOption,
  GasStations
}