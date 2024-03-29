'use client';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getUser } from '@/services/user';
import { useAppSelector } from '@/redux/store';
import { selectUserProfile } from '@/redux/slices/user';
import { useUpdateProfileMutation } from '@/redux/services/user/user';
import { filterChangedFormFields } from '@/utils/form';
import { mapValuesToSubmit } from './service';
import { UserProfileFormSchema, UserProfileFormValues } from './validation';
import ProfileDetailsView from './view';

function ProfileDetails() {
  const user = useAppSelector(selectUserProfile);
  const methods = useForm({
    resolver: yupResolver(UserProfileFormSchema),
    defaultValues: async () => {
      const user = await getUser();
      return {
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        birthday: user?.birthday || new Date().toISOString(),
      };
    },
  });
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();

  const {
    reset,
    getValues,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      reset(getValues());
      toast.success('Edited profile successfully');
    }
  }, [isSuccess, getValues, reset]);

  const handleSubmit = (values: UserProfileFormValues) => {
    const changedFormValues = filterChangedFormFields(values, dirtyFields);
    updateProfile({ ...mapValuesToSubmit(changedFormValues), userId: user?._id || '' });
  };

  return <ProfileDetailsView methods={methods} onSubmit={handleSubmit} />;
}

export default ProfileDetails;
