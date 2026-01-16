---
name: auth-skill
description: Implement secure authentication flows including signup, signin, password hashing, JWT tokens, and Better Auth integration.
---

# Auth Skill – Secure Authentication

## Instructions

1. **User Authentication Flows**
   - Implement signup and signin endpoints
   - Validate user input (email, password, etc.)
   - Handle authentication errors gracefully

2. **Password Security**
   - Hash passwords using secure algorithms (bcrypt or argon2)
   - Never store plaintext passwords
   - Verify hashed passwords during signin

3. **Token Management**
   - Generate JWT access tokens on successful signin
   - Define token payloads and expiration
   - Securely verify and decode JWT tokens
   - Handle token refresh or re-authentication

4. **Better Auth Integration**
   - Configure Better Auth provider
   - Integrate with backend (FastAPI / API routes)
   - Connect frontend auth flows (Next.js)
   - Manage sessions and protected routes

5. **Authorization**
   - Protect private routes and APIs
   - Implement role-based or user-based access if required
   - Ensure unauthorized requests are blocked

## Best Practices
- Use environment variables for secrets and keys
- Enforce strong password rules
- Use HTTPS-only cookies when applicable
- Set proper JWT expiration and rotation
- Centralize auth logic for maintainability
- Log auth errors without exposing sensitive data

## Example Flow
```text
User Signup → Password Hashing → User Stored
User Signin → Password Verify → JWT Issued
JWT → Protected API / Route Access
