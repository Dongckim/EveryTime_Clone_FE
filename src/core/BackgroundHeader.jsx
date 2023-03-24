import styled from "styled-components"

const BackgroundHeader = ({children}) => {

    return(
        <Header>
            {children}
        </Header>
    )
}

export default BackgroundHeader

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 54px;
    height: 72px;
    width:375px;
    background-color: #111111;
`