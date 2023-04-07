import { User } from 'src/types/user.type';
import { SuccessResponseType } from 'src/types/utils.type';
import https from 'src/utils/https';

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string;
  newPassword?: string;
}

const userApi = {
  getProfile() {
    return https.get<SuccessResponseType<User>>('me');
  },
  updateProfile(body: BodyUpdateProfile) {
    return https.put<SuccessResponseType<User>>('user', body);
  },
  uploadAvatar(body: FormData) {
    return https.post<SuccessResponseType<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userApi;
