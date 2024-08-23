import {useNavigation} from 'react-router-dom'

const SubmitBtn = ({form_btn}) => {
    const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button type='submit' className={`btn btn-block ${form_btn && 'form-btn' }`} disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
  )
}

export default SubmitBtn