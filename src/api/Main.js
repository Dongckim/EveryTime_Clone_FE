//axios 들어가는 모든 모듈
import axios from "axios";
import { getCookie, setCookie } from "./Cookies";

const apiTok = axios.create({
	baseURL: "http://3.38.102.13",
});

//전체게시물 조회
const getMain = async () => {
    const response = await apiTok.get('/api/boards')
    return response
}

//로그인
// const LoginUser = async (LogInUser) => {
//     const response = await api.post('/api/users/login', LogInUser)    
//     const token = response.headers.authorization.split(' ')[1]
//     setCookie('token', token, {path:'/'})
// }


apiTok.interceptors.request.use(
    (config)=>{
        // 요청을 보내기 전 수행 
        // 헤더에 토큰넣기
        const token = getCookie('token')
        if(config.headers && token ){
            config.headers.Authorization = `Bearer ${token}`
        }
      console.log("인터셉트 요청 성공!");
      return config;
    },
    function (error) {
      // 오류 요청을 보내기 전 수행
      console.log("인터셉트 요청 오류!");
      return Promise.reject(error);
    }
  );

apiTok.interceptors.response.use(
function (response) {
    console.log("인터넵트 응답 받았어요!");
    // alert(response.data.message)
    return response;
},

function (error) {
    console.log("인터셉트 응답 못받았어요...ㅠㅠ");
    // alert(error.response.data.message)
    // status code에 따른 공통 에러 처리를 해주실 수 있어요 ! 
    return Promise.reject(error);
}
);
  
export default apiTok;


export { getMain }