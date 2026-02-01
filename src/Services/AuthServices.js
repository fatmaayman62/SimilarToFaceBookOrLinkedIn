
import axios from "axios";

export async function RegisterAuth(values)
{
    try{
        let {data}=await axios.post('https://linked-posts.routemisr.com/users/signup',values);
        return data.message;

    }catch(err){
        return err.response.data.error;
    }
}
export async function LogInAuth(values)
{
    try{
        let {data}=await axios.post('https://linked-posts.routemisr.com/users/signin',values);
        return data;

    }catch(err){
        return err.response.data;
    }
}