import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import studyRecruitData from "../../data/studyRecruitData";
import studyRooms from "../../data/studyRooms";
import StudyHeader from "../StudyDetail/StudyHeader";
import StudyContent from "../StudyDetail/StudyContent";
import StudyRoomLink from "../StudyDetail/StudyRoomLink";
import CommentSection from "../StudyDetail/CommentSection";
import DeletePostModal from "../common/DeletePostModal"; // 모달 컴포넌트 import
import axiosInstance from "../../utils/axiosInstance"; // Axios 인스턴스 import
=======
import studyRecruitData from "../../data/studyRecruitData"; // 스터디 모집 더미 데이터 import
import studyRooms from "../../data/studyRooms"; // 스터디 룸 더미 데이터 import
import StudyHeader from "../StudyDetail/StudyHeader"; // 스터디 헤더 컴포넌트 import
import StudyContent from "../StudyDetail/StudyContent"; // 스터디 콘텐츠 컴포넌트 import
import StudyRoomLink from "../StudyDetail/StudyRoomLink"; // 스터디 룸 링크 컴포넌트 import
import CommentSection from "../StudyDetail/CommentSection"; // 댓글 섹션 컴포넌트 import
import DeletePostModal from "../common/DeletePostModal"; // 모달 컴포넌트 import
import axiosInstance from "../../utils/axiosInstance"; // Axios 인스턴스 import
import beDomain from "../../utils/constants"; // 서버 도메인 import
>>>>>>> upstream/dev

const RecruitStudyDetailContainer: React.FC = () => {
  // URL 파라미터에서 ID를 가져오기
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // 댓글 상태를 관리하기 위한 useState
  const [comments, setComments] = useState<
    {
      id: number;
      text: string;
      author: string;
      createdAt: number;
      profileImage: string;
    }[]
  >([]);
<<<<<<< HEAD
  const [isRecruited, setIsRecruited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 모달 표시 여부 상태
=======
>>>>>>> upstream/dev

  // 모집 완료 여부 상태 관리
  const [isRecruited, setIsRecruited] = useState(false);
  // 삭제 모달 표시 여부 상태 관리
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // studyId를 정수로 변환하여 저장 (id가 존재하지 않으면 null)
  const studyId = id ? parseInt(id, 10) : null;
  // studyRecruitData에서 현재 게시글 데이터를 찾는다.
  const study = studyRecruitData.find((item) => item.id === studyId);
  // studyRooms에서 해당 스터디룸을 찾는다 (기본적으로 첫 번째 룸).
  const studyRoom = studyRooms.find((item) => item.id === 1) || null;

  // 컴포넌트가 마운트될 때, study 데이터에 따라 상태를 설정한다.
  useEffect(() => {
    if (study) {
      const sortedComments =
        study.comments
          ?.map((comment) => ({
            id: comment.id,
            text: comment.content,
            author: comment.user.nickname,
            createdAt: comment.createdAt,
            profileImage: comment.user.profileImage,
          }))
          .sort((a, b) => b.createdAt - a.createdAt) || [];

      // 댓글을 최신순으로 정렬하여 상태에 저장한다.
      setComments(sortedComments);
      // 모집 완료 여부를 상태에 저장한다.
      setIsRecruited(study.isRecruited || false);
    }
  }, [study]);

  // 댓글을 제출할 때 호출되는 함수
  const handleCommentSubmit = (comment: string) => {
    const newComment = {
      id: comments.length + 1,
      text: comment,
      author: "현재 사용자", // 임시로 지정한 작성자 이름
      createdAt: Math.floor(Date.now() / 1000),
      profileImage: "/assets/images/logo.png", // 임시 프로필 이미지
    };

    // 새로운 댓글을 추가한 후 상태 업데이트
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);

    // study 데이터에 새로운 댓글을 추가한다.
    if (study && study.comments) {
      study.comments.push({
        id: newComment.id,
        user: {
          id: 1,
          nickname: "현재 사용자",
          profileImage: newComment.profileImage,
        },
        content: newComment.text,
        createdAt: newComment.createdAt,
      });
    }
  };

  // 스터디룸으로 이동하는 함수
  const handleNavigateToRoom = () => {
    if (isRecruited) {
      navigate("/wait");
    }
  };

  // 게시글 수정 페이지로 이동하는 함수
  const handleEditPost = () => {
<<<<<<< HEAD
    // 게시글 수정 로직
=======
>>>>>>> upstream/dev
    navigate(`/recruit/update/${studyId}`);
  };

  // 게시글을 삭제하는 함수
  const handleDeletePost = async () => {
    try {
<<<<<<< HEAD
      await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`
      );
=======
      await axiosInstance.delete(`${beDomain}/api/v1/posts/${studyId}`);
>>>>>>> upstream/dev
      navigate("/recruit/list"); // 삭제 후 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 모집 완료 상태를 업데이트하는 함수
  const handleCompleteRecruitment = () => {
    setIsRecruited(false);
  };

  // ID가 없는 경우 처리
  if (!id) {
    return <div>유효한 ID를 제공해 주세요.</div>;
  }

  // study 데이터가 없는 경우 처리
  if (!study) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  // 현재 사용자가 글 작성자인지 확인
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
<<<<<<< HEAD
        onDeletePost={() => setShowDeleteModal(true)} // 모달 표시
=======
        onDeletePost={() => setShowDeleteModal(true)} // 삭제 모달을 표시
>>>>>>> upstream/dev
      />

      {/* 스터디 콘텐츠 컴포넌트 */}
      <StudyContent content={study.content} />

      {/* 스터디 룸 링크 컴포넌트 */}
      <StudyRoomLink
        studyRoom={
          studyRoom
            ? {
                id: 1,
                title: studyRoom.title,
                camEnabled: studyRoom.camEnabled,
                currentUsers: studyRoom.users.length,
                maxUsers: studyRoom.maxUsers,
                thumbnail: studyRoom.thumbnail,
              }
            : null
        }
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
<<<<<<< HEAD
          onConfirm={handleDeletePost} // 게시글 삭제
=======
          onConfirm={handleDeletePost} // 삭제 확정 시 호출
>>>>>>> upstream/dev
          onCancel={() => setShowDeleteModal(false)} // 모달 닫기
        />
      )}
    </div>
  );
};

export default RecruitStudyDetailContainer;
