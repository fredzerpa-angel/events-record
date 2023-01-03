import { useEffect, useState } from "react";
import useCookies from 'react-cookie/cjs/useCookies';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [profile, setProfile] = useState(null);
  const [cookies] = useCookies(['profile']);
  const navigate = useNavigate();

  // Load logged in user
  useEffect(() => {
    const { profile } = cookies;
    profile ? setProfile(profile) : navigate('/login');
  }, [cookies, setProfile, navigate])

  return { profile };
}

export default useAuth;