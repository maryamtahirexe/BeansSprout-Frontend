import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCurrentUser,
  selectIsAdmin,
  selectAuthLoading,
  selectAuthError,
} from '../features/auth/authSlice';
import { loginUser, signupUser, logoutUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = async (creds, returnUrl = '/menu') => {
    const result = await dispatch(loginUser(creds));
    if (loginUser.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.user.name}! 🌸`);
      navigate(returnUrl);
      return true;
    } else {
      toast.error(result.payload?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (userData) => {
    const result = await dispatch(signupUser(userData));
    if (signupUser.fulfilled.match(result)) {
      toast.success(`Welcome to BeansSprout, ${result.payload.user.name}! 🌸`);
      navigate('/menu');
      return true;
    } else {
      toast.error(result.payload?.message || 'Signup failed');
      return false;
    }
  };

  const logout = async () => {
    await dispatch(logoutUser());
    toast.success('See you soon! ☕');
    navigate('/');
  };

  return { user, isAdmin, loading, error, login, signup, logout, isAuthenticated: !!user };
}
