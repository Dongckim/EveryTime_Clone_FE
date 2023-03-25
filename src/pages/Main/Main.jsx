import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMain } from "../../api/Main";

const Main = () => {
    const navigate = useNavigate();
    const { isLoading, isError, data } = useQuery('getMain',getMain,{
        refetchOnWindowFocus:false
    })
    console.log(data)
    return (
        <div style={{marginTop:'0px',color:'#ffffff'}}>
            <div style={{marginBottom:'30px', fontSize:'25px'}}>
                <span>13기</span>
                <span>로그아웃</span>
                <span>회원탈퇴</span>
            </div>
           {data?.data.data.map((value,index)=> {
            return (
            <Wrapper key = {value.boardType} 
            onClick={()=>{
                navigate(`/${value.boardType}`)
            }}>
                <div style={{height:'40px', width:'320px', display:'flex', justifyContent:'space-between'}}>
                    <span>{value.typeName}</span>
                    <span>더보기</span>
                </div>
                {value.boardContent.map((item,index)=>{
                    return (
                        <ContentBox key={Math.random()}>
                            <span>{item.title}</span>
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
    height: 200px;
    width: 320px;
    padding: 10px;
`
const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 13px;
`