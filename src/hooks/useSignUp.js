
// const useSignUp = () => {
//     const [signUpData, setSignUpData] = useState({
//         id : '',
//         pw : '',
//         pwConfirm: '',
//         nickname : '',
//         cerificateCode: ""
//     })

//     const onChangeHandler = (e, label) => {
//         setSignUpData((prev) => {...prev, [label] : e.targe.value}) // 얘네를 훅으로 빼도 좋을 것 같네여 validation 까지 해버리게 ㅇㅇ
//     }

//     const checkValidation = useMemo(() => {
//         // 여기서 체크해서 내려주는거쥬
//         return true
//     }, [signUpData])
//     return {}
// }

// export default useSignUp;