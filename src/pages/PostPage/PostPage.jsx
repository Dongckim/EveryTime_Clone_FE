import axios from "axios";
import { useState } from "react";
import { ImCancelCircle} from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../api/Cookies";
import { addDashBoard } from "../../api/DashBoard";
import PostPageButton from "../../core/PostPageButton";
import { editModeHandler, openHandler } from "../../redux/modules/Board";

const PostPage = () => {
    const { boardType } = useParams();
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const {isopen, isEdit, boardId} = useSelector(state => state.Board)
    const mutation = useMutation({
        mutationFn:(newcontent)=>{
            addDashBoard(newcontent)
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries('getDashBoard');
            navigator(`/${boardType}`)
        }
    })
    const accessToken = getCookie('token')
    const mutator = useMutation({
        mutationFn: async(editState) => {
            const response = await axios.patch(`http://3.38.102.13/api/board/${boardId}`,editState,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['getDashBoard']);
        }
    })
    
    const [state, setState] = useState({
        title:'',
        content:'',
        boardType: +boardType
    })

    const editCompleteStatus = () => {
        mutator.mutate(state)
        dispatch(editModeHandler())
        dispatch(openHandler())
        navigator(`/${boardType}`)
    }

    const PostAddHandler = () => {
        mutation.mutate(state)
    }

    console.log(state)
    return (
        <>
            <div>
                {isEdit ? (
                <>
                    <HeaderPost>
                        <ImCancelCircle onClick={()=>{
                            navigator(`/${boardType}`)
                            dispatch(editModeHandler())
                        }}/>
                        <span style={{marginLeft:'40px'}}>수정하기</span>
                        <button onClick={editCompleteStatus}>수정완료</button>
                    </HeaderPost>
                    <Wrapper>
                        <STinput placeholder="제목"
                        onChange={(e)=>{
                            setState({
                                ...state,
                                title : e.target.value,
                            })
                        }}/>
                        <STtextarea placeholder="내용을 입력하세요."
                            onChange={(e)=>{
                                setState({
                                    ...state,
                                    content: e.target.value
                                })
                            }}  
                        />
                    </Wrapper>   
                </>
                ):(
                <>
                    <HeaderPost>
                        <ImCancelCircle onClick={()=>{
                            navigator(`/${boardType}`)
                            dispatch(editModeHandler())
                        }}/>
                        <button onClick={PostAddHandler}>완료</button>
                    </HeaderPost>
                    <Wrapper>
                        <STinput placeholder="제목"
                        onChange={(e)=>{
                            setState({
                                ...state,
                                title : e.target.value,
                            })
                        }}/>
                        <STtextarea placeholder="내용을 입력하세요."
                            onChange={(e)=>{
                                setState({
                                    ...state,
                                    content: e.target.value
                                })
                            }}  
                        />
                    </Wrapper>   
                </>
                )}
                
                <div>
                   <Txtdiv>
                    에브리항해는 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 재정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. 
                    </Txtdiv>
                    <Txtdiv>
                    아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.
                    </Txtdiv>
                    <Txtdiv>
                    정치, 사회 관련 행위 금지
                    <li>
                        국가 기관, 정치 관련 단체, 언론, 시민 단체에 대한 언급 혹은 이와 관현한 행위  
                    </li>
                    <li>정책, 외교 또는 정치,정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위</li>
                    <li>성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련된 행위</li>
                    <li>위와 같은 내용으로 유추될 수 있는 비유, 은유 사용 행위</li>
                    </Txtdiv>
                    <Txtdiv>
                    홍보 및 판매 관련 행위 금지
                    <li>영리 여부와 관계 없이 사업체, 기관, 단체, 개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위</li>
                    <li>위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭</li>
                    <li>단어 언급 행위</li>
                    </Txtdiv>
                    <Txtdiv>
                    불법 촬영물 유통 금지
                    <li>타인의 권리를 침해하거나 불쾌감을 주는 행위</li>
                    <li>범죄, 불법 행위 등 법령을 위반하는 행위</li>
                    <li>욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위</li>
                    <li>음란물, 성적 수치심을 유발하는 행위</li>
                    <li>스포일러, 공포, 속임, 놀라게 하는 행위</li>
                    </Txtdiv> 
                </div>
            </div>
        </>
        
    )
}
export default PostPage;


const Txtdiv = styled.div`
    width: 320px;
    font-size: 12px;
    font-weight:600;
    margin-top: 14px;
    color: #5C5C5E;
;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const STinput= styled.input`
    background-color: transparent;
    border: none;
    height: 50px;
    font-size: 20px;
    border-bottom: 1px solid gray;
    color: #ffffff;
`
const STtextarea = styled.textarea`
    background-color: transparent;
    height: 122px;
    font-size: 15px;
    border: none;
    color: #ffffff;
    margin-bottom: 50px;
`
const HeaderPost = styled.div`
    position: relative;
    color: white;
    height: 30px;
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
    align-items: center;
`