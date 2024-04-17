import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add } from 'store/userSlice';
import { defaultLoginFormData } from './consts';
import { LoginFormData } from './types';
import { VALIDATION_SCHEMA } from './validations';

export const useLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: defaultLoginFormData,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const setUsername = (username: string) => {
    dispatch(add(username));
  };

  const onSubmit = handleSubmit(async (data) => {
    setUsername(data.username);
    navigate('/game');
  });
  return {
    control,
    onSubmit,
    formState,
  };
};
