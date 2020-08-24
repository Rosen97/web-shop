export interface HomeState {
  loginStatus: boolean;
  userInfo: UserInfoProps;
}

export interface UserInfoProps {
  answer: string;
  createTime: number;
  email: string;
  id: number;
  password: string;
  phone: string;
  question: string;
  role: number;
  updateTime: number;
  username: string;
}
