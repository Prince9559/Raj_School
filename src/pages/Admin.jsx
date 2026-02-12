import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useCookies } from 'react-cookie';
import { defaultSchoolCode } from '../main';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myCookie, setMyCookie] = useCookies("tokenByAnshCloud");

  console.log("myCookie :",myCookie)

  

  const {setUser,user} = useContext(UserContext);
  console.log("user :",user)

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setIsError('Email and password are required');
      return;
    }

    try {
      setIsError(null);
     const schoolCode=defaultSchoolCode;
      const response = await axios.post('/login', {
        email,
        password,
        schoolCode,
      });
      console.log("response :",response)

      // Assuming your server returns a token upon successful login
      const token = response.data.admin.token;

      setUser(response.data.admin);

      // Set the token in a cookie with an expiration of 1 hour
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);

      document.cookie = `tokenByAnshCloud=${token}; expires=${expirationDate.toUTCString()}; path=/`;

      // Update the state to indicate the user is logged in
      setIsLoggedIn(true);

      console.log('Admin logged in successfully', response.data);
      alert('Admin logged in successfully');

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error logging in admin:', error);
      setIsError('Error logging in admin. Please try again.');
    }
  };

  return (
    <div>
      
      <section className="bg-gray-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Admin Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "  required="" onChange={handleEmailChange}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" onChange={handlePasswordChange}/>
                  </div>
                  
                  <button type="submit" className="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500" onClick={handleSubmit}>Sign in</button>
                 
              </form>
          </div>
      </div>
  </div>
</section>
      {isError && <p style={{ color: 'red' }}>{isError}</p>}
    </div>
  );
}

export default Admin;
