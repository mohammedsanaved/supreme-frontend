'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// Toast component for feedback
const Toast: React.FC<{
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={
        `fixed top-5 right-5 z-50 px-4 py-2 rounded-full shadow-lg font-medium ` +
        (type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white')
      }
    >
      {message}
    </div>
  );
};

const ContactSection: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const initialValues: FormValues = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = (
    values: FormValues,
    {
      resetForm,
      setSubmitting,
    }: { resetForm: () => void; setSubmitting: (b: boolean) => void }
  ) => {
    // simulate API call
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      setToast({ message: 'Your message has been sent!', type: 'success' });
    }, 1000);
  };

  return (
    <section
      id='contact'
      className='bg-[#0067B1] text-white py-20 px-6 md:px-20 flex flex-col md:flex-row h-90vh'
    >
      {/* Left info */}
      <div className='md:w-1/2 md:pr-10 mb-12 md:mb-0'>
        <h2 className='text-4xl font-bold mb-2'>Get in touch</h2>
        <div className='w-16 h-1 bg-white mb-6'></div>
        <p className='mb-6'>For general enquiries</p>
        <div className='space-y-4 text-sm'>
          <div>
            <span className='font-semibold'>Address:</span>
            <br />
            110, 16th Road, Chembur, Mumbai - 400071
          </div>
          <div>
            <span className='font-semibold'>Phone:</span>
            <br />
            +91 22 25208822
          </div>
          <div>
            <span className='font-semibold'>Email:</span>
            <br />
            info@supremegroup.co.in
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className='md:w-1/2 md:pl-10'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-8'>
              {/* Full Name */}
              <div>
                <Field
                  name='fullName'
                  type='text'
                  placeholder='Full name'
                  className='w-full border-b border-gray-300 bg-transparent placeholder-gray-200 focus:outline-none focus:border-white py-2'
                />
                <ErrorMessage
                  name='fullName'
                  component='div'
                  className='mt-1 text-red-200 text-xs'
                />
              </div>
              {/* Email */}
              <div>
                <Field
                  name='email'
                  type='email'
                  placeholder='E-mail'
                  className='w-full border-b border-gray-300 bg-transparent placeholder-gray-200 focus:outline-none focus:border-white py-2'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='mt-1 text-red-200 text-xs'
                />
              </div>
              {/* Subject */}
              <div>
                <Field
                  name='subject'
                  type='text'
                  placeholder='Subject'
                  className='w-full border-b border-gray-300 bg-transparent placeholder-gray-200 focus:outline-none focus:border-white py-2'
                />
                <ErrorMessage
                  name='subject'
                  component='div'
                  className='mt-1 text-red-200 text-xs'
                />
              </div>
              {/* Message */}
              <div>
                <Field
                  name='message'
                  as='textarea'
                  rows={4}
                  placeholder='Message'
                  className='w-full border-b border-gray-300 bg-transparent placeholder-gray-200 focus:outline-none focus:border-white py-2 resize-none'
                />
                <ErrorMessage
                  name='message'
                  component='div'
                  className='mt-1 text-red-200 text-xs'
                />
              </div>
              {/* Submit */}
              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-white text-[#0067B1] font-semibold rounded-full px-10 py-3 hover:bg-gray-100 transition'
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default ContactSection;
