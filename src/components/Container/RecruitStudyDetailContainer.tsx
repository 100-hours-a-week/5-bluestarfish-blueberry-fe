import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudyHeader from "../StudyDetail/StudyHeader"; // 스터디 헤더 컴포넌트 import
import StudyContent from "../StudyDetail/StudyContent"; // 스터디 콘텐츠 컴포넌트 import
import StudyRoomLink from "../StudyDetail/StudyRoomLink"; // 스터디 룸 링크 컴포넌트 import
import CommentSection from "../StudyDetail/CommentSection"; // 댓글 섹션 컴포넌트 import
import DeletePostModal from "../common/DeletePostModal"; // 모달 컴포넌트 import
import axiosInstance from "../../utils/axiosInstance"; // Axios 인스턴스 import

const RecruitStudyDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 게시글 상태 관리
  const [study, setStudy] = useState<any | null>(null);
  // 댓글 상태 관리
  const [comments, setComments] = useState<
    {
      id: number;
      text: string;
      author: string;
      createdAt: number;
      profileImage: string;
    }[]
  >([]);
  // 모집 완료 여부 상태 관리
  const [isRecruited, setIsRecruited] = useState(false);
  // 삭제 모달 표시 여부 상태 관리
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 스터디룸 정보 상태 관리
  const [studyRoom, setStudyRoom] = useState<any | null>(null);

  // studyId를 정수로 변환하여 저장 (id가 존재하지 않으면 null)
  const studyId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`);
        const studyData = response.data.data;
  
        setStudy(studyData);
        setIsRecruited(studyData.recruited || false);
  
        const sortedComments =
          studyData.comments
            ?.map((comment: any) => ({
              id: comment.id,
              text: comment.content,
              author: comment.user.nickname,
              createdAt: comment.createdAt,
              profileImage: comment.user.profileImage,
            }))
            .sort((a: any, b: any) => b.createdAt - a.createdAt) || [];
  
        setComments(sortedComments);
  
        // 스터디 룸 정보 설정
        if (studyData.room) {
          setStudyRoom({
            id: studyData.room.id,
            title: studyData.room.title,
            postCamEnabled: studyData.room.camEnabled,
            currentUsers: studyData.room.currentUsers,
            maxUsers: studyData.room.maxUsers,
            thumbnail: studyData.room.thumbnail,
          });
        }
      } catch (error) {
        console.error("게시글을 불러오지 못했습니다:", error);
        alert("해당 게시글을 찾을 수 없습니다.");
        navigate("/recruit/list");
      }
    };
  
    fetchStudyDetail();
  }, [studyId, navigate]);
  

  // 댓글을 제출할 때 호출되는 함수
  const handleCommentSubmit = (comment: string) => {
    const newComment = {
      id: comments.length + 1,
      text: comment,
      author: "현재 사용자", // 임시로 지정한 작성자 이름
      createdAt: Math.floor(Date.now() / 1000),
      profileImage: "/assets/images/logo.png", // 임시 프로필 이미지
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);

    // 실제 API 호출을 통해 댓글을 저장하는 로직 추가 가능
  };

  // 스터디룸으로 이동하는 함수
  const handleNavigateToRoom = () => {
    if (isRecruited) {
      navigate("/wait");
    }
  };

  // 게시글 수정 페이지로 이동하는 함수
  const handleEditPost = () => {
    navigate(`/recruit/update/${studyId}`);
  };

  // 게시글을 삭제하는 함수
  const handleDeletePost = async () => {
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`
      );

      navigate("/recruit/list"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 모집 완료 상태를 업데이트하는 함수
  const handleCompleteRecruitment = async () => {
    try {
      // 변경 전의 recruited 상태를 콘솔에 출력
      console.log("Before update:", { recruited: study.recruited });
    
      // 서버에 PATCH 요청을 보내어 isRecruited 상태만 false로 업데이트
      const requestBody = {
        userId: study.user.id,          // 기존 userId 유지
        roomId: study.room?.id,         // roomId가 있을 경우 포함
        title: study.title,             // 기존 제목 유지
        content: study.content,         // 기존 내용 유지
        type: study.type,               // 기존 유형 유지
        isRecruited: false,             // 모집 완료 상태로 변경
      };
  
      await axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`, requestBody);
    
      // 요청이 성공하면 클라이언트의 상태를 업데이트
      setIsRecruited(false);
    
      // study 객체의 다른 필드를 유지하면서 isRecruited 필드만 업데이트
      setStudy((prevStudy: any) => {
        const updatedStudy = { ...prevStudy, recruited: false };
        
        // 변경 후의 recruited 상태를 콘솔에 출력
        console.log("After update:", { recruited: updatedStudy.recruited });
        
        return updatedStudy;
      });
    
      alert("모집 완료로 변경되었습니다.");
      // window.location.reload(); // 화면 새로고침
    } catch (error: any) {
      console.error("모집 상태 변경 실패:", error);
      alert("모집 상태 변경에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  
  



  if (!studyId) {
    return <div>유효한 ID를 제공해 주세요.</div>;
  }

  if (!study) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  const isAuthor = study.user.id === 1;

  return (
    <div className="container mx-auto mt-8 p-4 mt-[100px] w-[1000px] h-full">
      {/* 스터디 헤더 컴포넌트 */}
      <StudyHeader
        study={study}
        isRecruited={isRecruited}
        isAuthor={isAuthor}
        onCompleteRecruitment={handleCompleteRecruitment}
        onEditPost={handleEditPost}
        onDeletePost={() => setShowDeleteModal(true)}
      />

      {/* 스터디 콘텐츠 컴포넌트 */}
      <StudyContent content={study.content} />

      {/* 스터디 룸 링크 컴포넌트 */}
      <StudyRoomLink
        studyRoom={studyRoom}
        isRecruited={isRecruited}
        handleNavigateToRoom={handleNavigateToRoom}
      />

      {/* 댓글 섹션 컴포넌트 */}
      <CommentSection
        comments={comments}
        isRecruited={isRecruited}
        onSubmitComment={handleCommentSubmit}
      />

      {/* 삭제 모달 컴포넌트 */}
      {showDeleteModal && (
        <DeletePostModal
          onConfirm={handleDeletePost}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default RecruitStudyDetailContainer;