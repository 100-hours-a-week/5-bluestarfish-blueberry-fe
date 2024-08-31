export interface Post {
  id: number;
  title: string;
  type: string;
  userResponse: {
    nickname: string;
    profileImage?: string | null;
  };
  postCamEnabled: boolean;
  room?: number | null;
  recruited: boolean;
}
