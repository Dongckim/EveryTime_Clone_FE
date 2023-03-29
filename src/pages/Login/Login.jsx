import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/LoginSignUp";
import Ninput from "../../core/Ninput";
import { StButton } from "../Signup/Signup";

const data = [
    {   
        Title : '아이디',
        label : "loginId",
        placeholder : "사용하실 아이디를 입력해주세요",
        text : '영문, 숫자, 4-20자'
    },
    {   
        Title : '비밀번호',
        label : "password",
        placeholder : "사용하실 비밀번호를 입력해주세요",
        text : '영문, 숫자, 특문이 2종류 이상 조합된 8-20자'
    }
]

const Login = () => {
    const navigate = useNavigate();
    const mutation = useMutation(LoginUser,{
        onSuccess: () => {
            navigate('/')
        }
    })

    const [InitialData, setInitialData] = useState({
        loginId : '',
        password : '',
    })

    const onChangeHandler = (e, label) => {
        setInitialData({
            ...InitialData,
            [label] : e.target.value
        })
    }

    const onSubmitHandler = () => {
        mutation.mutate(InitialData)
    }
    
    return (
        <form style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
            <img style = {{}} src="KakaoTalk_Image_2023-03-29-23-16-03.png"/> 
            <div style={{display:'flex', flexDirection:'column'}}>
               {data.map((value, index)=> {
                    return(
                        <Ninput key = {value.label}
                            placeholder= {value.placeholder}
                            label = {value.label}
                            onChangeHandler = {onChangeHandler}
                            value={value}
                            InitialData={InitialData}
                            theme={'login'}
                        />
                    )
                })}
            <StButton onClick={onSubmitHandler}>에브리항해 로그인</StButton>
            <div style={{fontWeight:'800', margin:'30px auto', color:'white'}}
                onClick={()=>{
                    navigate('/signup')
                }}
            >회원가입</div>
            </div>
        </form>
    )
}
export default Login;