import axios from "axios";



export async function GetSinglePost(id) {
    try{
        let {data}=await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
            headers:{
                token:localStorage.getItem("userTokenizer")
            } 
        })
        return data

    }catch(err){
        console.log(err)
    }
    
}
 


 
 



