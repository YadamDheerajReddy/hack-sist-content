import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  yearOfStudy: Yup.string().required('Year of Study is required'),
  department: Yup.string().required('Department is required'),
  whyContentLead: Yup.string().required('This field is required'),
  newIdeas: Yup.string().required('This field is required'),
});

const ContentLeadForm = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);  // State for showing the success popup
  const [errorMessage, setErrorMessage] = useState('');  // State for storing error messages
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);  // State for checking if registrations are open
  const [registrationsLeft, setRegistrationsLeft] = useState(0);  // Tracks how many registrations are left

  useEffect(() => {
    // Fetch the current registration count when the component mounts
    const fetchRegistrationCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/registration-count');
        const { count } = response.data;

        // If registration count is less than 20, allow registration
        if (count >= 20) {
          setIsRegistrationOpen(false);
        } else {
          setRegistrationsLeft(20 - count);  // Set the number of remaining registrations
        }
      } catch (error) {
        console.error('Error fetching registration count:', error);
      }
    };

    fetchRegistrationCount();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!isRegistrationOpen) {
      setErrorMessage('Registrations are closed as the limit has been reached.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', values);
      resetForm();
      setShowSuccessPopup(true);  // Show the popup after a successful submission
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('This email is already registered.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Content Lead Registration for Hack SIST</h1>
      <p className="text-gray-600 text-center mb-8">
        Interested in leading the content team for our club? Fill out the form below!
      </p>

      {!isRegistrationOpen && (
        <div className="text-center text-red-600 mb-6">
          Registrations are closed as the limit has been reached.
        </div>
      )}

      {isRegistrationOpen && (
        <p className="text-center text-green-600 mb-6">
          {registrationsLeft} spots remaining!
        </p>
      )}

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phoneNumber: '',
          yearOfStudy: '',
          department: '',
          previousExperience: '',
          writingSamples: '',
          whyContentLead: '',
          newIdeas: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Field
                type="text"
                name="fullName"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="fullName" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Field
                type="tel"
                name="phoneNumber"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Year of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Year of Study</label>
              <Field
                type="text"
                name="yearOfStudy"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="yearOfStudy" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <Field
                type="text"
                name="department"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="department" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Previous Writing Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Writing Experience (Optional)</label>
              <Field
                as="textarea"
                name="previousExperience"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
            </div>

            {/* Writing Samples */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Writing Samples (Optional)</label>
              <Field
                as="textarea"
                name="writingSamples"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
            </div>

            {/* Why Content Lead */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Why Do You Want to Be the Content Lead for Hack SIST?</label>
              <Field
                as="textarea"
                name="whyContentLead"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="whyContentLead" component="div" className="text-red-600 text-sm" />
            </div>

            {/* New Ideas */}
            <div>
              <label className="block text-sm font-medium text-gray-700">What New Ideas Would You Bring to Hack SIST's Content Team?</label>
              <Field
                as="textarea"
                name="newIdeas"
                className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={!isRegistrationOpen}
              />
              <ErrorMessage name="newIdeas" component="div" className="text-red-600 text-sm" />
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || !isRegistrationOpen}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Registration Successful!</h2>
            <p className="text-gray-700 mb-6">
              Thank you for registering as a Content Lead for Hack SIST. We will get back to you soon.
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentLeadForm;
