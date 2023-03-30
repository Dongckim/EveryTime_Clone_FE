import styled, { css } from "styled-components";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCommentDots, FaRegThumbsUp} from 'react-icons/fa';
import Profile from "../../core/Profile";
import {IoPerson} from 'react-icons/io5'
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { getCookie } from "../../api/Cookies";
import { useDispatch, useSelector } from "react-redux";
import { editModeHandler, isReplyOpenHandler, openHandler, openIamge, storeBoardId } from "../../redux/modules/Board";
import ModalLayout from "../../core/ModalLayout";
import ModalContainer from "../../core/ModalContainer";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import BigImage from "../../core/BigImage";

const BoardContent = () => {
    const navigator = useNavigate();
    const [inputValue, setInputValue] = useState({
        "comment" : "",
        "anonymous": false
    })
    const queryClient = useQueryClient();
    const {boardId, boardType} = useParams();
    const accessToken = getCookie('token')
    const {isopen, isReplyOpen, ReplyId, isOpenImage} = useSelector(state => state.Board)
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
        mutationFn: async({ boardId }) => {
            await axios.delete(`http://3.38.102.13/api/board/${boardId}`,{
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
            await axios.post(`http://3.38.102.13/api/comment/${boardId}`,newComment,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['getThatBoard'])
            setInputValue({
                ...inputValue,
                "comment" : "",
            })
        }
    })

    const AddLike = useMutation({
        mutationFn: async() => {
            await axios.post(`http://3.38.102.13/api/boards/${+boardId}`,null,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(['getThatBoard'])
        }
    })

    const DeleteReply = useMutation({
        mutationFn: async(id) => {
            await axios.delete(`http://3.38.102.13/api/comment/${id}`,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })
        },
        onSuccess:()=>{
            dispatch(isReplyOpenHandler())
            queryClient.invalidateQueries(['getThatBoard'])
        },
        onError:(error)=>{
            dispatch(isReplyOpenHandler())
            alert(error.response.data.message)
        }
    })

    const editMode = () => {
        if(data.onMine){
            dispatch(openHandler())
            dispatch(editModeHandler())
            dispatch(storeBoardId(+boardId))
            navigator(`/${boardType}/PostPage`)
        }else{
            dispatch(isReplyOpenHandler())
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
        const {name, value, checked} = event.target
        if(name === 'anonymous'){
            setInputValue({
                ...inputValue,
                [name]:checked
            })
        }else{
            setInputValue({
                ...inputValue,
                [name]:value
            })
        }
        
    }

    const onReplyPost = (event) => {
        event.preventDefault();
        mutatorReply.mutate(inputValue)
        const {name} = event.target
        if(name === 'anonymous'){
            setInputValue({
            ...inputValue,
            [name]:true
            })
        }
    }
    
    return (
        <>
            <div>
                <Headerdiv>
                    <div style={{padding : '20px'}}
                        onClick={()=>{
                            navigator(`/${data.boardType}`)
                        }}>
                    <AiOutlineArrowLeft/>
                    </div>
                    <ALdiv>
                        <span style={{fontSize:'16px', fontWeight:'600'}}>{data.typeName}</span>
                        <span style={{fontSize:'13px', fontWeight:'900', color:'#686868'}}>13기</span>
                    </ALdiv>
                    {data.onMine ?(
                        <div style={{padding : '20px',fontSize:'20px',color:'#ffffff'}}
                            onClick={onClickHandler}>
                            <BiDotsVerticalRounded/>
                        </div>
                    ): (
                    <div style={{padding : '20px',fontSize:'20px',color:'#111111'}}>
                        <BiDotsVerticalRounded/>
                    </div>
                    )}
                </Headerdiv>
                <div>
                    <Profile/>
                    <PRdiv>{data.userName}</PRdiv>
                    <PRdate>{data.createdAt}</PRdate>
                </div>
                <div>
                    <Title>{data.title}</Title>
                    <Body>
                    <div style={{height:'120px',width:'330',fontWeight:'500', whiteSpace: 'pre-wrap', overflow:'auto', overflowX:'hidden'}}>{data.content}</div>
                    <div onClick={()=>{dispatch(openIamge(true))}}>
                        <img src={data.filePath} style={{height:'100px'}}/>
                    </div>
                    <div>
                        {data.onLike ? (
                            <ThumbUp theme={'onLike'} onClick={()=>{
                                AddLike.mutate()
                            }}> <FaRegThumbsUp/> 공감
                            </ThumbUp>
                        ) : (
                        <ThumbUp theme={'offLike'} onClick={()=>{
                                AddLike.mutate()
                            }}> <FaRegThumbsUp/> 공감
                            </ThumbUp>
                        )}
                        <div style={{position:'absolute', left:'3px',top:'128px', fontSize:'15px', display:'flex', gap:'8px'}}>
                            <span style={{color:'#D46655',fontWeight:'500'}}>
                                <FaRegThumbsUp/>{data.totalLike}</span>
                            <span style={{color:'#3bdb90',fontWeight:'500'}}>
                                <FaRegCommentDots/>{data.totalComment}</span>
                        </div>
                        
                    </div>
                    </Body> 
                </div>
                <div>
                    <CommWrapper>
                        {data.commentList.map(item=>{
                            return(
                                <CommentForm key={Math.random()}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                        <div>
                                            <span style={{padding:'5px', border:'1px solid gray', borderRadius:'10px',fontSize:'15px'}}><IoPerson/></span>
                                            <span style={{marginLeft:'10px',fontWeight:'800'}}>{item.userName}</span> 
                                        </div>
                                        <span onClick={()=>{dispatch(isReplyOpenHandler(item.id))}}><BiDotsVerticalRounded/></span>
                                    </div>
                                    <span style={{marginTop:'8px', fontWeight:'800',color:'gray', fontSize:'13px'}}>{item.comment}</span>
                                    <span style={{fontSize:'9px',marginTop:'3px',fontWeight:'600',color:'gray'}}>{item.createdAt}</span>
                                </CommentForm>
                            )
                        })}
                    </CommWrapper>
                    <form onSubmit={(event)=>{onReplyPost(event)}}>
                        <div>
                            <AnonymousCheck type={"checkbox"}
                                onChange={onChangeHandler}
                                name='anonymous'
                            />
                            <AnonyDiv>익명</AnonyDiv>
                        </div>
                        <ReplyInput
                            name="comment"
                            value={inputValue.comment}
                            placeholder="댓글을 입력하세요"
                            onChange={onChangeHandler}
                            style={{color:"white"}}
                            required
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
            {isReplyOpen&&(
                <ModalLayout>
                    <div style={{display:'flex', gap:'10px'}}>
                        <ModalContainer>
                            <ModalButton onClick={()=>{
                                DeleteReply.mutate(ReplyId)
                            }}>삭제하기</ModalButton>
                            <ModalButton onClick={()=>dispatch(isReplyOpenHandler())}>취소</ModalButton>
                        </ModalContainer>
                    </div>
                </ModalLayout>
            )}
            {isOpenImage&&(
                <ModalLayout>
                    <BigImage>
                        <img src={data.filePath} style={{width:'350px'}}
                            onClick={()=>dispatch(openIamge(false))}
                        />
                    </BigImage>
                </ModalLayout>
            )}
        </>
    )
}
export default BoardContent;

const AnonyDiv = styled.div`
    position:absolute;
    top: 760px;
    left: 50px;
    color: white;
    font-weight: 600;
`

const ThumbUp = styled.div`
    top: 152px;
    color: white;
    position:absolute;
    color: #7a7a7a;
    font-size: 12px;
    padding:8px;
    border-radius: 10px;
    ${({theme})=>{
        switch(theme){
            case 'onLike':
                return css`
                    color: #D46655;
                    border: 1px solid #D46655;
                `
            case 'offLike':
                return css`
                    color: #7a7a7a;
                    border: 1px solid gray;
                `
        }
    }}
`
const AnonymousCheck = styled.input`
    position: absolute;
    top: 760px;
    left: 20px;
    height: 15px;
    width: 15px;
`

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
    top: 380px;
    left: 30px;
    width: 330px;
    height: 350px;
    overflow: auto;
`
const ReplyInput = styled.input`
    position: absolute;
    background-color: white;
    top: 750px;
    left: 90px;
    width: 250px;
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
    width: 300px;
    white-space:pre-line;
`