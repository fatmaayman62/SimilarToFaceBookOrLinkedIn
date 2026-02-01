import axios from "axios";



export async function GetUserPosts(id) {
    try{
        let {data}=await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`,{
            headers:{
                token:localStorage.getItem("userTokenizer")
            } 
        }) 
        return data

    }catch(err){
        console.log(err)
    }
    
}