import { useState, useEffect } from 'react';
import { getUser } from '@services/user.service.js'; 

const useGetUser = (rut) => {
    const [user, setUser] = useState(null); 
    
    const fetchUser = async () => {
        try {
            const response = await getUser(rut); 
            console.log("responsexd ",response);
            const formattedUser = {
                nombreCompleto: response.nombreCompleto,
                rut: response.rut,
                email: response.email,
                rol: response.rol,
                createdAt: response.createdAt,
            };
            setUser(formattedUser); 
        } catch (error) {
            console.error("Error: ", error);
        };
}
    useEffect(() => {
        fetchUser(); 
    }, []);

    return { user, fetchUser, setUser };
};


export default useGetUser;
