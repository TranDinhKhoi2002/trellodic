'use client';
import { useAppSelector } from '@/redux/store';
import { selectUserProfile } from '@/redux/slices/user';
import { useUpdateSkillsMutation } from '@/redux/services/user/user';
import SkillsView from './view';

function Skills() {
  const user = useAppSelector(selectUserProfile);
  const [updateSkillsInProfile, { isLoading, isSuccess }] = useUpdateSkillsMutation();

  const handleUpdateSkills = (skills: string[]) => {
    if (!user) return;
    updateSkillsInProfile({ userId: user._id, skills });
  };

  return <SkillsView isUpdating={isLoading} isSuccess={isSuccess} onUpdateSkills={handleUpdateSkills} />;
}

export default Skills;
