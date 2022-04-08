export function stringToDate(dateString: any) {
    try {
        var parts = dateString.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    } catch(error) {
        console.log(error);
    }
}

export function getDate(anyDate: any) {
    try {
        if(typeof(anyDate) === "string") {
            // In the Cievs case, the date can be in 'DD/MM/AAAA HH:MM:SS' format.
            if(anyDate.includes(' ')) {
                anyDate = anyDate.split(' ');
                anyDate = stringToDate(anyDate[0]);
            } else {
                anyDate = stringToDate(anyDate);
            }
            return anyDate;
        } else {
            return anyDate;
        }
    } catch(error) { 
        console.log(error);
    }
}
