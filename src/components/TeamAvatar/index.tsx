import React from 'react';
import { genColor } from '../../utils/colors';
import './index.less';

interface TeamAvatarProps {
  teamName: string;
  size: 'small' | 'large';
}

// gradient circle seeded by team name
const TeamAvatar = ({ teamName, size }: TeamAvatarProps) => (
  <div
    className={`TeamAvatar ${size}`}
    style={{
      background: `linear-gradient(30deg, ${genColor(teamName)}, ${genColor(`${teamName}_additional_seed`)})`,
    }}
  />
);

export default TeamAvatar;
