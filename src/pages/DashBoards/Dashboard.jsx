import axios from "axios";
import jwtDecode from "jwt-decode";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../api/Cookies";

const Dashboard = () => {
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

    console.log(data)

    const onClickHandler = (id) => {
        navigator(`${id}`)
    }

    if(isLoading || isError){
        return <div>로딩중</div>
    }
    return (
        <div style={{color:'white'}}>
            <SelectHeader>
                <span style={{marginLeft:'10px'}}
                onClick={()=>{
                    navigator('/')
                }}
                ><AiOutlineArrowLeft/></span>
                <span>{data[0].typeName}</span>
                <span style={{marginRight:'10px'}}></span>
            </SelectHeader>
            <WrapperContainer>
                {data[0].boardContent.map((item)=>{
                return <PostWrapper key={Math.random()}
                onClick={()=>onClickHandler(item.id)}>
                    {item.title}

                    </PostWrapper>
                })}
            </WrapperContainer>
            
            <div onClick={()=>{
                navigator(`/${boardType}/PostPage`)
            }}>글쓰기
            </div>
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
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    padding: 20px;
    width : 300px;
`
const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`