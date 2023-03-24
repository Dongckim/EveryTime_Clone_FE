//axios 들어가는 모든 모듈
import axios from "axios";

//로그인
const LoginUser = async (newUser) => {
    await axios.post('http://localhost:4000/signup',newUser)    
}

export { LoginUser }