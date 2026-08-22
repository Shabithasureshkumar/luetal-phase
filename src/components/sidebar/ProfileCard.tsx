import React from 'react';
import { UserProfile } from '../../types/tracker';
import profileImage from '../../assets/profile 1.png';

interface ProfileCardProps {
  profile: UserProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="w-full h-[158px] bg-gradient-to-r from-[#E5469D] to-[#FF81B3] rounded-[33.8px] p-5 text-white shadow-xs relative overflow-hidden flex items-center justify-between">
      {/* Left text info */}
      <div className="flex flex-col justify-center z-10 space-y-0.5 pl-1">
        <h3 className="text-[21.6px] font-extrabold tracking-tight leading-tight">
          {profile.name}
        </h3>
        <p className="text-[16.75px] font-semibold text-white leading-tight">
          Gender:{profile.gender}
        </p>
        <p className="text-[16.75px] font-normal text-white leading-tight">
          Age:{profile.age}
        </p>
      </div>

      {/* Right profile image loaded from local assets */}
      <div className="w-28 h-[158px] absolute right-0 bottom-0 flex items-end justify-end select-none pointer-events-none">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
};
