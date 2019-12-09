export const generateHeaders = (bearer?:string) => {
    let headers;
    if(bearer) {
        headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${bearer}`
        }
    } else {
        headers = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }
    return headers;
}