import { useState } from 'react'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'

function Profile() {
  const [view, setView] = useState(null)

  //change image of the profile here

  // const handleChangePasswordClick = () => {
  //   if (view === 'change-password')
  //     setView(null)
  //   else
  //     setView('change-password')
  // }

  return <div className="profile-container">
    {/* Photo of the profile */}
    <div className='image-container' >
      <div className='image-wrapper'>
        <img src="dc.jpg" alt="photo" />
      </div>
    </div>

    {/* change name */}
    <div className='profile-wrapper-button'>
      <div className='Profile__buttons'>
        {<ChangeName />}

      </div>
      {/* change password*/}
      <div className='change-password-form-container'>
        {<ChangePassword />}
      </div>

    </div>
  </div >
}

export default Profile



