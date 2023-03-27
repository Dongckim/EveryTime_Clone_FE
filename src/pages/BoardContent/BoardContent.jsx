import styled from "styled-components";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Profile from "../../core/Profile";
import {IoPerson} from 'react-icons/io5'
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getCookie } from "../../api/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { editModeHandler, openHandler, storeBoardId } from "../../redux/modules/Board";
import ModalLayout from "../../core/ModalLayout";
import ModalContainer from "../../core/ModalContainer";
import jwtDecode from "jwt-decode";
import { useState } from "react";

const BoardContent = () => {
    const navigator = useNavigate();
    const [inputValue, setInputValue] = useState({
        "comment" : "",
        "anonymous":false
    })
    const queryClient = useQueryClient();
    const {boardId, boardType} = useParams();
    const accessToken = getCookie('token')
    const {isopen} = useSelector(state => state.Board)
    const dispatch = useDispatch();
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
    const mutation = useMutation({
        mutationFn: async({boardId, boardType}) => {
            const response = await axios.delete(`http://3.38.102.13/api/board/${boardId}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        },
        onSuccess: () => {
            dispatch(openHandler())
            navigator(`/${boardType}`)
        },
        onError:(error)=>{
            window.alert(error.response.data.message)
            dispatch(openHandler())
            
        }
    })
    const mutatorReply = useMutation({
        mutationFn: async(newComment) => {
            console.log(newComment)
            await axios.post(`http://3.38.102.13/api/comment/${boardId}`,newComment,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['getThatBoard'])
            setInputValue({
                "comment" : "",
                "anonymous":false
            })
        }
    })


    const editMode = () => {
        const token = jwtDecode(getCookie('token'))
        if(token.sub == data.userName){
            dispatch(editModeHandler())
            dispatch(storeBoardId(+boardId))
            dispatch(openHandler())
            navigator(`/${boardType}/PostPage`)
        }else{
            alert('본인이 작성하지 않은 글은 수정할 수 없습니다.')
        }
    }
    
    if(isLoading || isError){
        return <div>...로딩중이야</div>
    }

    const onClickHandler = () => {
        dispatch(openHandler())
    }

    const onChangeHandler = (event) => {
        setInputValue({
            comment: event.target.value,
            anonymous:'false'
        })
    }

    const onReplyPost = (event) => {
        event.preventDefault();
        mutatorReply.mutate(inputValue)
    }

    console.log(inputValue)
    return (
        <>
            <div>
                <Headerdiv>
                    <div style={{padding : '20px'}}
                    onClick={()=>{
                        navigator(`/${data.boardType}`)
                    }}
                    ><AiOutlineArrowLeft/></div>
                    <ALdiv>
                        <span style={{fontSize:'16px', fontWeight:'600'}}>{data.typeName}</span>
                        <span style={{fontSize:'13px', fontWeight:'900', color:'#686868'}}>13기</span>
                    </ALdiv>
                    <div style={{padding : '20px',fontSize:'20px',color:'#ffffff'}}
                    onClick={onClickHandler}
                    ><BiDotsVerticalRounded/></div>
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
                        {data.commentList.map(item=>{
                            return(
                                <CommentForm key={Math.random()}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <div>
                                            <span style={{padding:'5px', border:'1px solid gray', borderRadius:'10px',fontSize:'15px'}}><IoPerson/></span>
                                            <span style={{marginLeft:'10px',fontWeight:'800'}}>{item.userName}</span> 
                                        </div>
                                        
                                    </div>
                                    <span style={{paddingLeft:'5px', marginTop:'5px', fontWeight:'800',color:'gray'}}>{item.comment}</span>
                                </CommentForm>
                            )
                        })}
                    </CommWrapper>
                    <form onSubmit={(event)=>{onReplyPost(event)}}>
                    <ReplyInput
                    value={inputValue.comment}
                    placeholder="댓글을 입력하세요"
                    onChange={(event)=>onChangeHandler(event)}
                    style={{color:"white"}}
                    /> 
                    </form>
                    
                </div>
            </div>
            {isopen&&(
                <ModalLayout>
                    <div style={{display:'flex', gap:'10px'}}>
                        <ModalContainer>
                            <ModalButton onClick={editMode}>수정하기</ModalButton>
                            <ModalButton onClick={()=>{
                                mutation.mutate({boardId, boardType})
                            }}>삭제하기</ModalButton>
                            <ModalButton onClick={onClickHandler}>취소</ModalButton>
                        </ModalContainer>
                    </div>
                </ModalLayout>
            )}
        </>
    )
}
export default BoardContent;

const ModalButton = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 320px;
    :hover{
        background-color: #747474ff;
    }
`
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
`
const CommWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    color: white;
    top: 250px;
    left: 30px;
    width: 310px;
    height: 455px;
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
const CommentForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 10px 10px 0px;
    border-bottom: 1px solid #ffffff;
    border-top: 1px solid #ffffff;
    height: 60px;
`