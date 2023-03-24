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
    width:375px;
    background-color: white;
    margin-top: 100px;
    margin-bottom: 100px;
`