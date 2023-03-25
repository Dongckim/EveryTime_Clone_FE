import { BsPersonCircle } from 'react-icons/bs'
import styled from 'styled-components';

const Profile = () => {

    return (
        <STdiv style={{color:'white'}}>
            <BsPersonCircle/>
        </STdiv>
    )
}

export default Profile;

const STdiv = styled.div`
    position: absolute;
    top: 90px;
    left: 30px;
    width: 40px;
    height: 40px;
    font-size: 40px;
`