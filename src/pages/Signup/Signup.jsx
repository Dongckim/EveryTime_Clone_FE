import Ninput from "../../core/Ninput";
import styled from 'styled-components'
import {  useMutation, useQueryClient } from "react-query";
import { SignUpUser } from "../../api/LoginSignUp";
import { useState } from "react";
import BackgroundHeader from "../../core/BackgroundHeader";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import { useNavigate } from "react-router-dom";

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
    },
    {   
        label : "confirmPassword",
        placeholder : "비밀번호를 확인해주세요",
    },
    {   
        Title : '이메일',
        label : "email",
        placeholder : "사용하실 이메일을 적어주세요",
        text : '아이디, 비밀번호 찾기에 필요'
    },
    {   
        Title : '인증코드',
        label : "secretKey",
        placeholder : "해당 기수 인증코드를 작성해주세요",
        text : '기수 확인을 위한 인증코드 필요'
    },
    {
        Title : '닉네임',
        label : "userName",
        placeholder : "사용하실 닉네임을 적어주세요",
        text : '커뮤니티 활동에 필요'
    },
]

const Signup = (props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    // const { mutate, isLoading, isSuccess, isIdle } = useMutation({
    //     mutationFn: async(newUser) => {
    //         await axios.post('http://3.38.102.13/signup',newUser)   
    //     }
    // })
    
    const mutation = useMutation(SignUpUser,{
        onSuccess: () => {
            navigate('/login')
        }
    })

    const onSubmitHandler = ()  => {
        mutation.mutate(InitialData)
    } 

    const [InitialData, setInitialData] = useState({
        loginId : '',
        userName : '',
        password: '',
        email : '',
        secretKey: '',
    })

    const onChangeHandler = (e, label) => {
        setInitialData({
            ...InitialData,
            [label] : e.target.value
        })
    }

    return (
        <>
        
            <Wrapper>
                <BackgroundHeader>
                    <Stdiv>
                        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                            <BackButton onClick={()=>{
                                navigate('/login')
                            }}>
                                <AiOutlineArrowLeft/>
                            </BackButton>
                            <span style={{fontSize:'20px', color:'white'}}>회원가입</span>
                        </div>
                        <BackButton onClick={()=>{
                                navigate('/')
                            }}>
                            <ImCancelCircle/>
                        </BackButton>
                    </Stdiv>
                </BackgroundHeader>
                <span style={{fontSize:'20px', color:'black', marginTop:'90px'}}>회원가입</span>
                {data.map((value, index) => {
                    return  (
                    <Ninput key={value.label}
                        placeholder ={value.placeholder} 
                        label={value.label}
                        onChangeHandler={onChangeHandler}
                        InitialData = {InitialData}
                        value = {value}>
                    </Ninput>)
                })}
                <StButton onClick={onSubmitHandler}>회원가입</StButton>
            </Wrapper>
        </>    
        
    )
}

export default Signup;

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-Items:center;
    gap:5px;
    height: 100%;
    width: 100vw;
    background-color: #ffffff;
`
export const StButton = styled.div`
    display:flex;
    align-Items:center;
    justify-content:center;
    width: 313.11px;
    height: 35.54px;
    border-radius: 12px;
    margin-top: 80px;
    text-indent:1em;
    font-size: 15px;
    color: #ffffff;
    font-weight: 800;
    cursor:pointer;
    background-color : #D46655;
    :hover{
        background-color : #d45845;
    }
    :active{
        background-color : #c53b26;
    }
`
const BackButton = styled.div`
    color: white;
    font-size: 30px;
    border-radius : 10px;
    cursor: pointer;
`
const Stdiv = styled.div`
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    width: 336px;
`