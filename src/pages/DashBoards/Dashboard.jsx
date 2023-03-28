import axios from "axios";
import jwtDecode from "jwt-decode";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {ImPencil2} from 'react-icons/im'
import{FaRegThumbsUp, FaRegCommentDots} from 'react-icons/fa'
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../api/Cookies";
import editModeHandler from '../../redux/modules/Board'

const Dashboard = () => {
    const dispatch = useDispatch();
    const token = jwtDecode(getCookie('token'))
    console.log(token)
    const navigator = useNavigate();
    const { boardType } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey:['getDashBoard'],
        queryFn: async() => {
            const accessToken = getCookie('token')
            const data = await axios.get(`http://3.38.102.13/api/boards?board-type=${+boardType}`,{
                headers: {
                        Authorization: `Bearer ${accessToken}`
                    } 
            })
            return data.data.data
        }
    })

    const onClickHandler = (id) => {
        navigator(`${id}`)
    }

    if(isLoading || isError){
        return <div>로딩중</div>
    }

    console.log(data)
    return (
        <div style={{color:'white', overflow: 'scroll', height:'750px',marginTop:'60px'}}>
            <SelectHeader>
                <span style={{padding:'20px'}}
                onClick={()=>{
                    navigator('/')
                }}
                ><AiOutlineArrowLeft/></span>
                <span>{data[0].typeName}</span>
                <span style={{padding : '20px', color:'#111111'}}><AiOutlineArrowLeft/></span>
            </SelectHeader>
            <WrapperContainer>
                {data[0].boardContent.map((item)=>{
                return (
                <PostWrapper key={Math.random()}
                    onClick={()=>onClickHandler(item.id)}>
                        <span style={{fontSize:'15px', fontWeight:'800'}}>{item.title}</span>
                        <div style={{fontSize:'10px', marginTop:'8px', width:'vmin',display:'flex', justifyContent:'space-between'}}>
                            <span>{item.createdAt}</span>
                            <div style={{display:'flex', gap:'10px',fontSize:'12px'}}>
                                <span><FaRegThumbsUp/>{item.totalLike}</span>
                                <span><FaRegCommentDots/>{item.totalComment}</span> 
                            </div>
                            
                        </div>
                </PostWrapper>
                )
                })}
            </WrapperContainer>
            <ButtonWriter onClick={()=>{
                navigator(`/${boardType}/PostPage`)
            }}><ImPencil2/>글쓰기
            </ButtonWriter>
        </div>
    )
}

export default Dashboard;

const SelectHeader = styled.div`
    height: 72px;
    width:375px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size:16px;
    font-weight:600;
    position: absolute;
    top:0px;
    left: 0;
`
const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    width : 330px;
`
const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:375px;
`
const ButtonWriter = styled.div`
    border: 2px solid gray;
    background-color: #111111;
    position: fixed;
    left:35%;
    top: 80%;
    display: flex;
    justify-content: center;
    width :115px;
    height: 45px;
    border-radius: 25px;
    align-items: center;
    gap: 15px;
    cursor: pointer;
`