import styled from "styled-components"

const PostPageButton = ({children}) => {
    return(
        <Stdiv>
            {children}
        </Stdiv>
    )
}
export default PostPageButton;

const Stdiv = styled.div`
    padding: 7px 10px 7px 10px;
    border-radius: 25px;
    background-color: #ED5F5F;
    font-size: 13px;
    color: #111111;
    :hover{
        background-color: #c53131;
    }
    :active{
        background-color: #a21919;
    }
`