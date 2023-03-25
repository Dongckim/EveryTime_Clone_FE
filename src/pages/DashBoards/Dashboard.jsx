import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDashBoard } from "../../api/DashBoard";

const Dashboard = () => {
    const navigator = useNavigate();
    const {boardType} = useParams();
    const response = useQuery('getDashBoard',getDashBoard(+boardType),{
        refetchOnWindowFocus : false,
    })

    console.log(response?.data)
    
    return (
        <div>
            대시보드를 볼 수 있는 페이지 입니다.
            <div onClick={()=>{
                navigator(`/${boardType}/PostPage`)
            }}>글쓰기
            </div>
        </div>
    )
}
export default Dashboard;