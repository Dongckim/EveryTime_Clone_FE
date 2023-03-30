import styled from "styled-components";

const Ninput = ({onChangeHandler, placeholder, label, InitialData, value}) => {
    return (
        <>  
            <Stdiv>
                <span style = {{color:'#111111'}}>{value.Title}</span>
                <span style = {{fontWeight:'900', fontSize:'10px',color:'#111111'}}>{value.text}</span>
            </Stdiv>
            <StInput 
            value={InitialData.label}
            placeholder={`${placeholder}`}
            type={value.label}
            required
            onChange={e => onChangeHandler(e, label)}
            />
            {(label === 'loginId')&&(
                ((InitialData.loginId.length< 4)&&(
                 <WarnText>
                    4자 이상 입력하세요
                </WarnText>   
                ))
            )}
            {(label === 'email')&&(
                ((InitialData.email.split('').filter(item=> item === '@').join(' ')===[])&&(
                    <WarnText>
                    올바른 이메일 형식을 입력해주세요
                    </WarnText>  
                ))
            )
            }
            {(label === 'secretKey')&&(
                ((InitialData.secretKey === '')&&(
                    <WarnText>
                    인증코드를 입력해주세요
                    </WarnText>  
                ))
            )
            }
        </>
    )
}

export default Ninput;

const StInput = styled.input`
    width: 313.11px;
    height: 35.54px;
    border-radius: 12px;
    text-indent:1em;
    font-size: 15px;
    border: none;
    background-color: #ededed;
`
const WarnText = styled.div`
    font-size: 12px;
    font-weight: 900;
    width: 300px;
    color: red;
    margin-left: 1.5em;
    margin-bottom: 10px;
`
const Stdiv = styled.div`
    width: 300px;
    font-weight: 700;
    margin-left: 1.5em;
    font-size: 12px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`