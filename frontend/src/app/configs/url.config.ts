import { environment } from "../../environments/environment";

const API = environment.apiUrl;

export const urlConfig = Object.freeze({
    api: {
        passwordValidate: `${API}/password/validate`
    }
})