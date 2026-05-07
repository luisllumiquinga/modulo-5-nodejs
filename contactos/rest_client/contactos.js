const IP="192.168.1.101";
const PORT=3001;
const URL="http://"+IP+":"+PORT+"/"

export const getAllContacts=(fnRefreshList)=>{
    console.log("getlAllContacts");
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

export const saveContactRest=(contact, fnShowMessage)=>{
    const config={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nombre:contact.name,
            apellido:contact.surName,
            celular:contact.phoneNumber
        })
    }

    fetch(
        URL+"contactos",config
    )
    .then(response=>response.json())
    .then(body=>{
        fnShowMessage();
        console.log(body);
    });
}

export const updateContactRest=(contact, fnShowMessage)=>{
    const config={
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:contact.id,
            nombre:contact.name,
            apellido:contact.surName,
            celular:contact.phoneNumber
        })
    }

    fetch(
        URL+"contactos/"+contact.id,config
    )
    .then(response=>response.json())
    .then(body=>{
        fnShowMessage();
        console.log(body);
    });
}