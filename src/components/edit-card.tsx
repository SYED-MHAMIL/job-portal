

type EditCardType={
    uid :string;
    address  : string
}

export default function EditCard({uid,address}:EditCardType){

  
    return (

        <>
          
        <h1>{uid}</h1>
        <h1>{address}</h1>
        <h1>{}</h1>
        <h1>{}</h1>
        
        </>
    )


}