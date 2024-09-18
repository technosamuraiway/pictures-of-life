import { useState } from 'react'

import { ProfileForm } from '@/entities/profile/generalInfo/ProfileForm'

export default function Profile() {
  // This state could manage if the submit button is disabled
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onSubmitProfileForm = (
    data: {
      aboutMe?: string
      city: string
      country: string
      dateOfBirth: Date
      firstName: string
      lastName: string
      username: string
    },
    resetForm: () => void
  ) => {
    resetForm()

    setButtonDisabled(true)
  }

  return (
    <>
      <div>My profile</div>
      <ProfileForm
        buttonDisabled={buttonDisabled} // Pass the buttonDisabled state
        onSubmitProfileForm={onSubmitProfileForm} // Pass the form submission handler
      />
    </>
  )
}
