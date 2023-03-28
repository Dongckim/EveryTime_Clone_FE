import styled from "styled-components";

const ModalLayout = ({children}) => {
    return (
        <STdiv>
            {children}
        </STdiv>
    )
}

const STdiv = styled.div`
    height: 865px;
    width: 375px;
    position: fixed;
    top: 32.5%;
    left: 50%;
    background-color: rgb(0,0,0,0.2);
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    gap: 5px;
`
export default ModalLayout;