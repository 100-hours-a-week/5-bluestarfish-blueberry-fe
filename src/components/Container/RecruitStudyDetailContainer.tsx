import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import studyRecruitData from "../../data/studyRecruitData";
import studyRooms from "../../data/studyRooms";
import StudyHeader from "../StudyDetail/StudyHeader";
import StudyContent from "../StudyDetail/StudyContent";
import StudyRoomLink from "../StudyDetail/StudyRoomLink";
import CommentSection from "../StudyDetail/CommentSection";

const RecruitStudyDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [comments, setComments] = useState<
    {
      id: number;
      text: string;
      author: string;
      createdAt: number;
      profileImage: string;
    }[]
  >([]);
  const [isRecruited, setIsRecruited] = useState(false);

  const studyId = id ? parseInt(id, 10) : null;
  const study = studyRecruitData.find((item) => item.id === studyId);
  const studyRoom = studyRooms.find((item) => item.id === 1) || null;

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

      setComments(sortedComments);
      setIsRecruited(study.isRecruited || false);
    }
  }, [study]);

  const handleCommentSubmit = (comment: string) => {
    const newComment = {
      id: comments.length + 1,
      text: comment,
      author: "현재 사용자",
      createdAt: Math.floor(Date.now() / 1000),
      profileImage: "/assets/images/logo.png",
    };
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);

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

  const handleNavigateToRoom = () => {
    if (isRecruited) {
      navigate("/wait");
    }
  };

  const handleEditPost = () => {
    // 게시글 수정 로직
  };

  const handleDeletePost = () => {
    // 게시글 삭제 로직
  };

  const handleCompleteRecruitment = () => {
    setIsRecruited(false);
  };

  if (!id) {
    return <div>유효한 ID를 제공해 주세요.</div>;
  }

  if (!study) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  const isAuthor = study.user.id === 1;

  return (
    <div className="container mx-auto mt-8 p-4 mt-[100px] w-[1000px] h-full">
      <StudyHeader
        study={study}
        isRecruited={isRecruited}
        isAuthor={isAuthor}
        onCompleteRecruitment={handleCompleteRecruitment}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
      />

      <StudyContent content={study.content} />

      <StudyRoomLink
        studyRoom={
          studyRoom
            ? {
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

      <CommentSection
        comments={comments}
        isRecruited={isRecruited}
        onSubmitComment={handleCommentSubmit}
      />
    </div>
  );
};

export default RecruitStudyDetailContainer;
