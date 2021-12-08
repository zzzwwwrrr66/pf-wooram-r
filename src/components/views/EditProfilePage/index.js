import React from 'react';


// 내가 tweet 한거, 프로필 수정, where사용해서 내 tweet 가져오기(orderBy) -> 에러링크 들어가면 자동으로 만들어줌 
// updateProfile 사용 수정-> displayName과 PhotoURL밖에 사용못함 -> 실시간으로 가져오려면 setuserObj(authService.currentUser.displayName or userId or photoUrl) => refreshUser function 을 만들것!!! 
// 리프레쉬 펑션 -> 프로필수정할때마다 리프레쉬 실행 -> 새로받아온 유저 정보를 리덕스 디스패치
function EditProfile() {
  return(
    <>
    <h1>
    EditProfile Page
    
    </h1>
    </>
  )
}

export default EditProfile;