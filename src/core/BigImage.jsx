import styled from "styled-components";

const BigImage = ({children}) => {
    return (
    <ContainImage>
        {children}
    </ContainImage>)
}

const ContainImage = styled.div`
    position: absolute;
    width: 300px;
    top: 300px;
    left: 13px;
`
export default BigImage;