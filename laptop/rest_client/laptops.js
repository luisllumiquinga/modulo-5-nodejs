const IP="192.168.100.59";
const PORT=3001;
const URL="http://"+IP+":"+PORT+"/"

export const getAllLaptops=(fnRefreshList)=>{
    console.log("getlAllLaptops...");
    fetch(
        URL+"laptops"
    ).then(
        (response)=>{ return response.json()}
    ).then(
        (body)=>{
            fnRefreshList(body);
        }
    )
}