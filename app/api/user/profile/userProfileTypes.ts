// ✅ app/api/user/profile/userTypes.ts

export type UserProfileUpdateInput = {
  id: string;
  name: string;
  image: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
};
