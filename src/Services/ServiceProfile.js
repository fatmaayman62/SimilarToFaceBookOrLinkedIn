import axios from "axios";



export async function ChangePasswordUser(values) {
    try{
        let {data}=await axios.patch(`https://linked-posts.routemisr.com/users/change-password`,values,{
            headers:{
                token:localStorage.getItem("userTokenizer")
            } 
        })
        return data

    }catch(err){
        console.log(err);
    }
    
}
export async function UploadPhotoUser(values) {
    try{
        let {data}=await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,values,{
            headers:{
                token:localStorage.getItem("userTokenizer")
            } 
        })
        return( data)

    }catch(err){
        console.log(err);
    }
    
}