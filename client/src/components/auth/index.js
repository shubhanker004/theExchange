import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import AuthForm from './authForm';
import PreventSignInRoute from 'hoc/preventSignIn';


const RegisterLogin = (props) => {
  const [formType, setFormType] = useState(false);


  const toogleFormType = () => {
    setFormType(!formType);
  }


  return(
    <PreventSignInRoute>
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            { formType ?
              <>
                <h1>Already Registered ?</h1>
                {/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> */}
              </>
              :
              <>
                <h1>Need to Register ?</h1>
                {/* <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum</p> */}
              </>
            }

            <Button
              variant="contained"
              color="default"
              size="medium"
              onClick={ ()=> toogleFormType() }
            >
              { formType ? "Sign In" : "Register" }
            </Button>

          </div>
          <div className="right">
            <h2>{formType ? 'Register':'Sign in'}</h2>
            <AuthForm
              formType={formType}
              {...props}
            />
          </div>
        </div>
      </div>
    </div>
    </PreventSignInRoute>
  )


}

export default RegisterLogin;