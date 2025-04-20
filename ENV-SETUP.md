# Environment Setup for FPL AI Manager

## Clerk Authentication

Add the following variables to your `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWJzb2x1dGUtZm94aG91bmQtODIuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_HcqIdTizC3lN03mKxfdqi7LTghoul8VHNDRMovr5aK
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

These redirect URLs will ensure users are sent to the correct pages after authentication actions.
