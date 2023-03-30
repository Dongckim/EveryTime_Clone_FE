import styled from "styled-components"

const BackgroundLayout = ({children}) => {

    return(
        <Layout>
            {children}
        </Layout>
    )
}

export default BackgroundLayout

const Layout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 812px;
    width:400px;
    background-color: #111111;
    position: fixed;
    margin-top: 20px;
`