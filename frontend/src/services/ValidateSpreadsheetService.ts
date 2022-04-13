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

        const headers = {
            "Content-type": "multipart/form-data",
        }
        // const headers = {
        //     Authorization: `Bearer ${token}`
        // }

        let formData = new FormData();
        formData.append("file", file);
        console.log("FORM DATA", formData);

        try {
            const data = await axios.post(apiUrl + route, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            })
            // const data = await axios({

            //     method: 'post',
            //     url: apiUrl + route,
            //     headers: {
            //         "Content-type": "multipart/form-data",
            //         Authorization: `Bearer ${token}`
            //     },
            
            // });

            return data;

        } catch(error) {
            console.error(error);
        }
    }
}

export { ValidateSpreadsheetService };
