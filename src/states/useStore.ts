import {create} from 'zustand';
import {StoreGetter, StoreSetter} from '../types';

type StoreType = StoreGetter & StoreSetter;

const initialState: StoreGetter = {
  user: {
    name: 'Hi, User',
    gender: '',
    location: '',
    profession: '',
    bio: '',
    profile_picture: '',
  },
  posts: [
    {
    id: 1,
    author: 'nav',
    location: 'Khas Kajora Colliery, West Bengal, India',
    date: '2025-06-12',
    title: 'Completing assignment',
    type: 'image',
    views: 10,
    likes: 2,
    media_link: 'https://www.india.com/wp-content/uploads/2025/05/1-63-1.jpg', // Royalty‑free Indian sunset video :contentReference[oaicite:2]{index=2}
  },
  {
    id: 2,
    author: 'aisha_k',
    location: 'Marine Drive, Mumbai, Maharashtra, India',
    date: '2025-06-11',
    title: 'Sunset Walk at Marine Drive',
    type: 'image',
    views: 342,
    likes: 28,
    media_link: 'https://www.india.com/wp-content/uploads/2025/05/1-63-1.jpg', // Unsplash sunset in Mumbai
  },
  {
    id: 3,
    author: 'nav',
    location: 'Baga Beach, Goa, India',
    date: '2025-06-10',
    title: 'Beach Vibes 🌊',
    type: 'image',
    views: 612,
    likes: 74,
    media_link: 'https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg?cs=srgb&dl=pexels-umaraffan499-88212.jpg&fm=jpg', // Unsplash Goa beach
  },
  {
    id: 4,
    author: 'meera_v',
    location: 'Charminar, Hyderabad, India',
    date: '2025-06-09',
    title: 'Heritage in Focus',
    type: 'image',
    views: 215,
    likes: 19,
    media_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNTkwhEDdPFQf71i8dQ6VvgsBF18bxZxdERw&s', // Unsplash Charminar
  },
  {
    id: 5,
    author: 'sid_travels',
    location: 'Ziro Valley, Arunachal Pradesh, India',
    date: '2025-06-08',
    title: 'Nature Escape 🌿',
    type: 'video',
    views: 482,
    likes: 51,
    media_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5oYixSLcIAPLW8q4EArZ2VNaS586EwFg2Q&s', // Time-lapse Delhi sunset (public domain) :contentReference[oaicite:3]{index=3}
  },
  {
    id: 6,
    author: 'tanya',
    location: 'Lajpat Nagar, New Delhi, India',
    date: '2025-06-07',
    title: 'Shopping Day Out',
    type: 'image',
    views: 138,
    likes: 12,
    media_link: 'https://media.istockphoto.com/id/1156663222/photo/busy-street-with-rickshaw-in-new-delhi-india.jpg?s=612x612&w=0&k=20&c=m0rmoa2Tzjrb3Vs2upC0oSbiWLDj1fFHUuWSEQt_W2s=', // Street shopping Delhi
  },
  {
    id: 7,
    author: 'krish_dev',
    location: 'MG Road, Bengaluru, India',
    date: '2025-06-06',
    title: 'Coding on the Go',
    type: 'image',
    views: 790,
    likes: 102,
    media_link: 'https://media.istockphoto.com/id/1491681012/photo/a-street-picture-of-the-famous-bazaar-known-as-chickpet-during-the-business-hour-at-bangalore.jpg?s=612x612&w=0&k=20&c=4IWcV4YPN3wh98bhp9msBB3NMqDE1rqLOi-YhpTCYG4=', // Bangalore street scene
  },
  {
    id: 8,
    author: 'anaya_d',
    location: 'Howrah Bridge, Kolkata, West Bengal, India',
    date: '2025-06-05',
    title: 'City Lights 🌃',
    type: 'image',
    views: 201,
    likes: 27,
    media_link: 'https://media.istockphoto.com/id/1058601654/photo/howrah-bridge.jpg?s=612x612&w=0&k=20&c=c8fRPm83Nq83fIDFs4vBUghSSs6eJ6JJ6MUGkdQVCcM=', // Howrah Bridge at night
  },
  {
    id: 9,
    author: 'farhan',
    location: 'Ladakh, India',
    date: '2025-06-04',
    title: 'Mountain Drone View',
    type: 'video',
    views: 953,
    likes: 143,
    media_link: 'https://media.gettyimages.com/id/1317625168/video/4k-video-footage-of-beautiful-lush-green-mountains.jpg?s=640x640&k=20&c=CnsFjLm4vp2pA1T7kz8wFvdZj9-N9mEVAm1FZWI0efs=', // Dharamshala sunset timelapse :contentReference[oaicite:4]{index=4}
  },
  {
    id: 10,
    author: 'nav',
    location: 'Amer Fort, Jaipur, Rajasthan, India',
    date: '2025-06-03',
    title: 'Fort Adventures 🏰',
    type: 'image',
    views: 330,
    likes: 36,
    media_link: 'https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1iZXIlMjBmb3J0fGVufDB8fDB8fHww', // Amer Fort
  },
  ],
};

export const useStore = create<StoreType>(set => ({
  ...initialState,
  updateUser: (userData: any) =>
    set((state: any) => ({user: {...state.user, ...userData}})),
}));
