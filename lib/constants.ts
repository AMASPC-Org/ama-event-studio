// ama-event-studio/lib/constants.ts

export const AUDIENCE_SEGMENTS = [
  'Young Professionals', 
  'Students', 
  'Tourists', 
  'Families', 
  'Tech Enthusiasts', 
  'Creatives', 
  'Couples', 
  'Luxury Seekers',
  'Locals' 
] as const;

export const PERSONAS = [
  'The Networker',     
  'The Audiophile',    
  'The Socialite',     
  'The Foodie', 
  'The Learner', 
  'The Night Owl'
] as const;

export const EVENT_TYPES = [
  'Live Music', 'DJ/Club', 'Comedy', 'Sports', 'Dining', 'Other'
] as const;

// Helper for UI badges
export const TYPE_COLORS: Record<string, string> = {
  'Live Music': 'bg-purple-100 text-purple-800',
  'DJ/Club': 'bg-pink-100 text-pink-800',
  'Comedy': 'bg-yellow-100 text-yellow-800',
  'Sports': 'bg-green-100 text-green-800',
  'Dining': 'bg-orange-100 text-orange-800',
  'Other': 'bg-gray-100 text-gray-800',
};
