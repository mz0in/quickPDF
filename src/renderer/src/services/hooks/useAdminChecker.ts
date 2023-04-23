import { useState, useEffect } from "react";

export const useAdminChecker = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user') as string);
    if(user.admin === true){
        setIsAdmin(true);
    }
  }, []);

  return [isAdmin];
};
