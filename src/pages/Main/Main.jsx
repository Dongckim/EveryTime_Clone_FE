import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DelCookie, getCookie } from "../../api/Cookies";
import { getMain } from "../../api/Main";

const Main = () => {
    const navigate = useNavigate();
    const { isLoading, isError, data } = useQuery('getMain',getMain,{
        refetchOnWindowFocus:false
    })
    const onLogoutHandler = () => {
        DelCookie('token')
        window.location.reload();
    }
    const className = getCookie('className')

    const accessToken = getCookie('token')
    const discardUser = async() => {
        await axios.delete('http://3.38.102.13/api/users',{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then(
            (window.confirm('정말로 탈퇴하시겠습니까?')&& (
                navigate('/login')
            ))
        )
    }

    useEffect(()=>{
        const token = getCookie('token')
        if(!token){
            navigate('login')
        }
    })

    return (
        <div style={{color:'#ffffff'}}>
            <HeaderTop>
                <ControlHead> 
                    <span style={{fontWeight:'900', color:'#D46655'}}>에브리항해</span>
                    <div style={{display:"flex", gap:'10px'}}>
                        <span style={{color:'#D46655', cursor:'pointer'}}
                            onClick={onLogoutHandler}
                        >로그아웃</span>
                        <span style={{color:'#D46655', cursor:'pointer'}}
                            onClick={discardUser}>회원탈퇴</span>
                    </div>
                </ControlHead>
                <span style={{fontWeight:'900'}}>{className}</span>
            </HeaderTop>
           {data?.data.data.map((value,index)=> {
            return (
            <Wrapper key = {value.boardType} 
            onClick={()=>{
                navigate(`/${value.boardType}`)
            }}>
                <div style={{height:'40px', width:'320px', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontWeight:'900'}}>{value.typeName}</span>
                        <span style={{fontWeight:'900',color:'#D46655'}}>더보기<AiOutlineRight/></span>
                </div>
                {value.boardContent.map((item,index)=>{
                    return (
                        <ContentBox key={Math.random()}>
                            <span style={{color:'gray', fontWeight:'500'}}>{item.title}</span>
                        </ContentBox>
                        )
                })}
            </Wrapper>)
           })}
        </div>
    )
}
export default Main;

const Wrapper= styled.div`
    height: 190px;
    width: 310px;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
`
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 13px;
`
const HeaderTop = styled.div`
    font-size : 25px;
    display : flex;
    justify-content: space-between;
    flex-direction: column;
    padding:10px;
    
`
const ControlHead = styled.div`
    font-size:15px;
    width: 330px;
    display: flex;
    justify-content: space-between;
`