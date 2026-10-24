import { LEADERBOARD_TYPES } from '../../actions/competition';

export const leaderboardTypeOptions = LEADERBOARD_TYPES.map((type) => ({ label: type, value: type }));

export const cleanGroups = (groups: string[]) =>
  Array.from(new Set(groups.map((group) => group.trim()).filter(Boolean)));
