import axios from "axios";

const BASE_URL = "https://localhost:7160/api";
// Probably gonna wind up being used on every page
function getUserInfoFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const storedToken = JSON.parse(token);
            const payload = storedToken.payload;

            // Access individual properties directly from the payload
            const name = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const nameIdentifier = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

            const info = {
                name: name,
                role: role,
                ID: Number(nameIdentifier)
            }
            return info;
        } catch (e) {
            console.log(e, "Error parsing token");
            return null;
        }
    }
    return null;
}

function findPatientByID(userID: string) {
    const intID = Number(userID);
    return axios.get(`https://localhost:7160/api/Patients/${intID}`)
}

function findDoctorByID(userID: string) {
    const intID = Number(userID);
    return axios.get(`https://localhost:7160/api/Doctors/${intID}`)
}

function fetchFromAPI(endpoint: string) {
    return axios.get(`${BASE_URL}${endpoint}`);
}

export { getUserInfoFromToken, findPatientByID, findDoctorByID, fetchFromAPI }