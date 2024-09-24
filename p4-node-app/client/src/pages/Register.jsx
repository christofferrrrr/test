import React, { useState } from 'react';
import api from '../api'; // Ensure this points to your API instance

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    sex: 'male',
    password: '',
    confirmPassword: '',
    isactive: true,
  });

  const [errors, setErrors] = useState({});
  const [registrationStatus, setRegistrationStatus] = useState(''); // New state for registration status

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const { firstname, lastname, password, confirmPassword } = formData;

    if (!/^[a-zA-Z]+$/.test(firstname)) {
      newErrors.firstname = 'First name must contain only letters.';
    }
    if (!/^[a-zA-Z]+$/.test(lastname)) {
      newErrors.lastname = 'Last name must contain only letters.';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Adjust the endpoint to match your backend route
        await api.post('/users', formData); // Ensure this matches your backend route
        setRegistrationStatus('Registration successful!'); // Update status message
        alert('Registration successful'); // Keep user informed
      } catch (error) {
        setRegistrationStatus('Registration failed: ' + (error.response?.data?.message || 'Unknown error')); // More informative error
        alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
      }
    } else {
      setRegistrationStatus('Please fix the errors in the form.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Register</h2>
      {registrationStatus && <p>{registrationStatus}</p>} {/* Display registration status */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select name="sex" value={formData.sex} onChange={handleChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

        <input type="hidden" name="isactive" value={formData.isactive} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;