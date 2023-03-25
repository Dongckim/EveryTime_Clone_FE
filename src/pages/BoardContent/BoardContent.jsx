import styled from "styled-components";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import Profile from "../../core/Profile";

const BoardContent = () => {
    const navigator = useNavigate();

    return (
        <div>
            <Headerdiv>
                <div style={{padding : '20px'}}
                onClick={()=>{
                    navigator('/')
                }}
                ><AiOutlineArrowLeft/></div>
                <ALdiv>
                    <span style={{fontSize:'16px', fontWeight:'600'}}>공지방</span>
                    <span style={{fontSize:'13px', fontWeight:'900', color:'#686868'}}>13기</span>
                </ALdiv>
                <div style={{padding : '20px', color:'#111111'}}><AiOutlineArrowLeft/></div>
            </Headerdiv>
            <div>
                <Profile/>
                <PRdiv>닉네임</PRdiv>
                <PRdate>createdAt</PRdate>
            </div>
            <div>
                <div>
                    <Title>제목이다 이쉐끼야</Title>
                    <Body>가나다라마바사아자차카타파하</Body> 
                </div>
                <div></div>
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
    height: 200px;
    border-bottom: 2px solid #666666;
`