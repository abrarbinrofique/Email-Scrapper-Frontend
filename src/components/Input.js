import { Navigate} from 'react-router-dom';
import { useState } from 'react';
import History from './History';
import Limit from './Limit'




const Input = () => {
  const [emails, setEmails] = useState([]); 
  const [redirect, setRedirect] = useState(null);
  const usertoken = localStorage.getItem('token');
  const isAuthenticated = usertoken !== null;

  
 const handlesearch=async (event)=>{


    event.preventDefault()
    const usertoken=localStorage.getItem('token')
    console.log(usertoken)

    if (!usertoken) {
      setRedirect('/LogIn'); 
      return; 
    }


    else{
      const searchValue = event.target.elements[0].value;;
      const userid = localStorage.getItem('user_id'); 

      console.log(searchValue,userid)
      const payload = {
        url: searchValue,
        user: userid
      };
      try {
        const response = await fetch('http://127.0.0.1:8000/scrapping/loademail/emailsearch/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usertoken}`, 
          },
          body: JSON.stringify(payload),
          
        });
        console.log(response)
  
        if (response.ok) {
          const result = await response.json();
          console.log('API response:', result);
          setEmails(result.emails);
        } else {
          console.error('API request failed with status:', response.status);
        
        }
      } catch (error) {
        console.error('API request error:', error);
       
      }
    };
    }
    

    if(redirect)
    {
      return <Navigate to={redirect}/>
    }
  
    return (
      <div className='container mt-5'>
        <form className="d-flex gap-2" role="search" onSubmit={handlesearch}>
        <input className="form-control " type="search" placeholder="Your Website address" aria-label="Search"/>
        <button className="btn btn-outline-dark" type="submit">Search</button>
      </form>


<div>
  <h5 className='my-5'>Emails of Your Website</h5>
  <ul>
  
          {emails && emails.length>0 ? (
            
           
            emails.map((email, index) => (
              <>
              <li key={index}>{email}</li> 
             <p>{emails.length} emails found</p>
             </>
            ))
          ) : (
            <p>No emails found.</p>
          )}
    </ul>
  
</div>

{isAuthenticated ? (
        <>
          <Limit />
          <History />
        </>
      ) : (
        <p>Please log in to see the history and limits.</p>
      )}

        
      </div>
    )
  }


export default Input
