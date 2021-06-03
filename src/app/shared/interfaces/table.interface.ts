import { ApiService } from "../services/api.service";


export interface TableConfig {
    columnsAndData: { column: string; dataKey: string }[];
    button?: { column: string; btnData: { btnText: string; btnColor?: string }[] }[];
    service?: ApiService;
    lang?: string;
    addButton: boolean
}