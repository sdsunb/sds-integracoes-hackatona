import axios from "axios";

interface IValidateSpreadsheetRequest {
    origin: string,
    file: any
}

class ValidateSpreadsheetService { 
    async execute({origin, file}: IValidateSpreadsheetRequest) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const route = `/validateSpreadsheet/${origin}`;
        const token = localStorage.getItem('token');

        let formData = new FormData();
        formData.append("file", file);

        try {
            const data = await axios.post(apiUrl + route, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            
            return data;

        } catch(error) {
            console.error(error);
        }
    }
}

export { ValidateSpreadsheetService };
