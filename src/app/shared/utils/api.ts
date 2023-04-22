const baseUrl = 'https://curriculum-backend.server.redenvalerio.com';

// Auth
const loginEndpoint = `${baseUrl}/api/login`;
const logoutEndpoint = `${baseUrl}/api/logout`;
const initAccountEndpoint = `${baseUrl}/api/init`;
const tokenValidationEndpoint = `${baseUrl}/api/validate-token`;

// User CRUD
const userEndpoint = `${baseUrl}/api/users`;

// Department CRUD
const departmentEndpoint = `${baseUrl}/api/departments`;

// Academic Year CRUD
const academicYearEndpoint = `${baseUrl}/api/academic-years`;

// Term CRUD
const termEndpoint = `${baseUrl}/api/terms`;

export {
  loginEndpoint,
  logoutEndpoint,
  initAccountEndpoint,
  tokenValidationEndpoint,
  userEndpoint,
  departmentEndpoint,
  academicYearEndpoint,
  termEndpoint,
};
