export type UserType = {
  name: string;
  gender: string;
  location: string;
  profession: string;
  bio: string;
  profile_picture: string;
};
export type PostsType = {
  id: number;
  author: string;
  location: string;
  date: string;
  title: string;
  type: string;
  views: number;
  likes: number;
  media_link: string;
};

export type StoreGetter = {
  user: UserType;
  posts: PostsType[];
};

export type StoreSetter = {
  updateUser: any;
};
