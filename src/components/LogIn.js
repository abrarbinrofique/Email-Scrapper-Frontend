import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 


const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useAuth();
    const [error, setError] = useState(null);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const navigate = useNavigate();  // Hook to navigate programmatically
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'username') setUsername(value);
      if (name === 'password') setPassword(value);
    };
    const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/user/profile/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response =>{
        if (!response.ok) {
            throw new setError('Login failed');
          }
        
        return response.json()})
      .then(data => {
         
        console.log(data)
        console.log(data.token)

        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        logIn();
        setRedirectToHome(true);
      })
      .catch(error => {
        console.error('Error:', error);
      })

    }
  
    if (redirectToHome) {
        navigate('/');
        return null;  
      }
    return (
        <>
        <section className="h-100 gradient-form custom-bg-color">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6 formbg">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <h4 className="mt-1 mb-5 pb-1">Welome in MailScrapper</h4>
                </div>

                {error && <p className='text-center' style={{ color: 'black', backgroundColor: 'red' }}>{error}</p>}
        
        <form className='m-5 ' onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter Your username"
          className='custom-input'

        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className='custom-input  my-2'
        />
        <button className='custom-input btn btn-warning' type="submit">Login</button>
      </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2 bgr">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    
      </>
    )
  }


export default LogIn
