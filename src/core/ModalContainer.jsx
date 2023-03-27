import styled from "styled-components"

const ModalContainer = ({children}) => {
    return (
        <Stdiv>
            {children}
        </Stdiv>
    )
}

const Stdiv = styled.div`
    width: 320px;
    background-color: #373737;
    border-radius: 10px;
    position: absolute;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #3d78ee;
    top:70%;
`

export default ModalContainer;