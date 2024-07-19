// components/CompanyRoleRegistrationForm.tsx
"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { registerCompanyRole } from '@/store/slices/companySlice';
import { Button } from "@/components/ui/button";

const CompanyRoleRegistrationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { registrationStatus, error } = useSelector((state: RootState) => state.company);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerCompanyRole(formData));
  };

  return (
    <div>
      <h2>Register Company Role</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={registrationStatus === 'loading'}>
          {registrationStatus === 'loading' ? 'Loading...' : 'Register'}
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CompanyRoleRegistrationForm;
