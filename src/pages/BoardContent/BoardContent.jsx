import styled from "styled-components";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../core/Profile";
import { isError, useQueries, useQuery } from "react-query";
import axios from "axios";
import { getCookie } from "../../api/Cookies";

const BoardContent = () => {
    const navigator = useNavigate();
    const {boardId}= useParams();
    const accessToken = getCookie('token')
    const { data, isLoading, isError } = useQuery({
        queryKey : ['getThatBoard'],
        queryFn : async() => {
            const response = await axios.get(`http://3.38.102.13/api/board/${boardId}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                } 
            })
            return response.data.data
        }
    })

    if(isLoading || isError){
        return <div>...로딩중이야</div>
    }

    return (
        <div>
            <Headerdiv>
                <div style={{padding : '20px'}}
                onClick={()=>{
                    navigator('/')
                }}
                ><AiOutlineArrowLeft/></div>
                <ALdiv>
                    <span style={{fontSize:'16px', fontWeight:'600'}}>{data.typeName}</span>
                    <span style={{fontSize:'13px', fontWeight:'900', color:'#686868'}}>13기</span>
                </ALdiv>
                <div style={{padding : '20px', color:'#111111'}}><AiOutlineArrowLeft/></div>
            </Headerdiv>
            <div>
                <Profile/>
                <PRdiv>{data.userName}</PRdiv>
                <PRdate>{data.createdAt}</PRdate>
            </div>
            <div>
                <Title>{data.title}</Title>
                <Body>{data.content}</Body> 
                <CommWrapper>
                    코멘트 창
                </CommWrapper>
                <form>
                   <ReplyInput
                   placeholder="댓글을 입력하세요"
                   /> 
                </form>
            </div>
        </div>
    )
}
export default BoardContent;

const Headerdiv = styled.div`
    position: relative;
    color: white;
    background-color: #111111;
    height: 72px;
    width:375px;
    bottom: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ALdiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const PRdiv = styled.div`
    position: absolute;
    color: white;
    font-weight: 800;
    top: 92px;
    left: 80px;
`

const PRdate = styled.div`
    position: absolute;
    top: 115px;
    left: 80px;
    color: #666666;
    font-size: 15px;
    font-weight: 600;
`

const Title = styled.div`
    position: absolute;
    color:white;
    font-weight: 900;
    font-size: 20px;
    left: 30px;
    top: 142px;
`

const Body = styled.div`
    position: absolute;
    top: 175px;
    color: #7a7a7a;
    left: 30px;
    width: 310px;
    font-weight: 800;
    height: min;
    padding-bottom: 1em;
    border-bottom: 2px solid #666666;
`
const CommWrapper = styled.div`
    display: flex;
    position: absolute;
    left: 30px;
    background-color: white;
    width: 310px;
    height: 100px;
    overflow: scroll;
`
const ReplyInput = styled.input`
    position: absolute;
    background-color: white;
    top: 740px;
    left: 30px;
    width: 310px;
    height: 40px;
    border-radius: 30px;
    background-color:#373737;
    text-indent:1em;
    border: none;
`