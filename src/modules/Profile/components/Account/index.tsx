'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '@/services/user';
import { ChangePasswordFormSchema, ChangePasswordFormValues } from './validation';
import AccountView from './view';

function Account() {
  const methods = useForm({
    resolver: yupResolver(ChangePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const { reset, getValues } = methods;

  const { mutate: updatePassword } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      reset(getValues());
      toast.success('Changed password successfully');
    },
  });

  const handleSubmit = (values: ChangePasswordFormValues) => {
    updatePassword({ ...values });
  };

  return <AccountView methods={methods} onSubmit={handleSubmit} />;
}

export default Account;
