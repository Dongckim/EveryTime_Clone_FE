import { useNavigate } from "react-router-dom";

const Main = () => {
    const nav = useNavigate();

    return (
        <div>
            메인 게시판들을 한눈에 볼 수 있는 곳입니다.
            <button
            onClick={()=>{
            nav('signup')}
            }>
                    야
            </button>
        </div>
    )
}
export default Main;