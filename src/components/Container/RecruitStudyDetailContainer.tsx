import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import StudyHeader from "../StudyDetail/StudyHeader";
import StudyContent from "../StudyDetail/StudyContent";
import StudyRoomLink from "../StudyDetail/StudyRoomLink";
import CommentSection from "../StudyDetail/CommentSection";
import DeletePostModal from "../common/DeletePostModal";
import ToastNotification from "../common/ToastNotification";

const RecruitStudyDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [study, setStudy] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isRecruited, setIsRecruited] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [studyRoom, setStudyRoom] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [mentionId, setMentionId] = useState<number | null>(null);
  const studyId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
        );
        setCurrentUser(response.data.data);
      } catch (error: unknown) {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", getErrorMessage(error));
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchComments = async (page = 0) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/comments/${studyId}?page=${page}`
      );

      const commentsData = response.data.data.content;

      if (Array.isArray(commentsData)) {
        const formattedComments = commentsData.map((comment: any) => ({
          id: comment.id,
          text: comment.content,
          author: comment.user.nickname,
          userId: comment.user.id,
          mentionedUser: comment.mentionedUser
            ? {
              id: comment.mentionedUser.id,
              nickname: comment.mentionedUser.nickname,
            }
            : null,
          createdAt: comment.createdAt ? new Date(comment.createdAt).getTime() : null,
          profileImage: `${process.env.PUBLIC_URL}/assets/images/real_ian.png`,
        }));

        setComments(formattedComments);
      } else {
        console.error("댓글 데이터가 배열이 아닙니다:", commentsData);
      }
    } catch (error: unknown) {
      console.error("댓글을 불러오는 데 실패했습니다:", getErrorMessage(error));
    }
  };

  useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`
        );
        const studyData = response.data.data;

        setStudy(studyData);
        setIsRecruited(studyData.recruited || false);

        if (studyData.roomResponse) {
          setStudyRoom({
            id: studyData.roomResponse.id,
            title: studyData.roomResponse.title,
            camEnabled: studyData.roomResponse.camEnabled,  // camEnabled 사용
            memberNumber: studyData.roomResponse.memberNumber, // memberNumber 사용
            maxUsers: studyData.roomResponse.maxUsers,
            thumbnail: studyData.roomResponse.thumbnail,
          });
        }

        await fetchComments();
      } catch (error: unknown) {
        console.error("게시글을 불러오지 못했습니다:", getErrorMessage(error));
        alert("해당 게시글을 찾을 수 없습니다.");
        navigate("/recruit/list");
      }
    };

    fetchStudyDetail();
  }, [studyId, navigate]);

  const handleCommentMention = (authorId: number | null) => {
    if (isRecruited && authorId !== currentUser?.id) {
      setMentionId(authorId);
    }
  };

  const handleCommentSubmit = async (comment: string) => {
    if (!comment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const requestBody = {
        postId: studyId,
        userId: currentUser.id,
        mentionId: mentionId,
        content: comment,
        createdAt: new Date().toISOString(),
      };

      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/comments`,
        requestBody
      );

      if (response.status === 201) {
        await fetchComments();
        setMentionId(null);
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error: unknown) {
      console.error("댓글 작성 실패:", getErrorMessage(error));
      alert("댓글 작성에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleNavigateToRoom = () => {
    if (isRecruited) {
      navigate(`/wait/${studyRoom.id}`);
    }
  };

  const handleEditPost = () => {
    navigate(`/recruit/update/${studyId}`);
  };

  const handleDeletePost = async () => {
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`
      );

      navigate("/recruit/list");
    } catch (error: unknown) {
      console.error("게시글 삭제 실패:", getErrorMessage(error));
      alert("게시글 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCompleteRecruitment = async () => {
    try {
      const requestBody = {
        userId: study.userResponse.id,
        roomId: study.room?.id,
        title: study.title,
        content: study.content,
        type: study.type,
        isRecruited: false,
      };

      await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${studyId}`,
        requestBody
      );

      setIsRecruited(false);

      setStudy((prevStudy: any) => {
        const updatedStudy = { ...prevStudy, recruited: false };
        return updatedStudy;
      });

      setShowToast(true);
    } catch (error: unknown) {
      console.error("모집 상태 변경 실패:", getErrorMessage(error));
      alert("모집 상태 변경에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  if (!studyId) {
    return <div>유효한 ID를 제공해 주세요.</div>;
  }

  if (!study) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  const isAuthor = study.userResponse.id === currentUser?.id;

  return (
    <div className="container mx-auto mt-8 p-4 mt-[100px] w-[1000px] h-full">
      <StudyHeader
        study={study}
        isRecruited={isRecruited}
        isAuthor={isAuthor}
        onCompleteRecruitment={handleCompleteRecruitment}
        onEditPost={handleEditPost}
        onDeletePost={() => setShowDeleteModal(true)}
      />

      <StudyContent content={study.content} />

      <StudyRoomLink
        studyRoom={studyRoom}
        isRecruited={isRecruited}
        handleNavigateToRoom={handleNavigateToRoom}
      />

      {isRecruited &&
        <CommentSection
          comments={comments}
          isRecruited={isRecruited}
          onSubmitComment={handleCommentSubmit}
          onMention={handleCommentMention}
          currentUser={currentUser}
          postId={studyId}
        />
      }

      {!isRecruited && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <span className="block w-full text-center"> ┈┈┈ ✁✃✁ 모집이 완료된 게시글입니다 ✁✁✃ ┈┈┈ </span>
      </div>
      
      )}

      {showDeleteModal && (
        <DeletePostModal
          title="게시글을 삭제하시겠습니까?"
          description="삭제된 게시글은 복구할 수 없습니다."
          onConfirm={handleDeletePost}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showToast && (
        <ToastNotification message="변경 완료!" isSuccess={true} onClose={handleCloseToast} />
      )}
    </div>
  );
};

function getErrorMessage(error: unknown): string {
  try {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  } catch (e) {
    return 'Unknown error';
  }
}

export default RecruitStudyDetailContainer;
