const IP="192.168.100.59";
const PORT=3001;
const URL="http://"+IP+":"+PORT+"/"

export const getAllContacts=(fnRefreshList)=>{
    console.log("getlAllContacts...");
    fetch(
        URL+"contactos"
    ).then(
        (response)=>{ return response.json()}
    ).then(
        (body)=>{
            fnRefreshList(body);
        }
    )
}