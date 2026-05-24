'use client';

import * as ClerkReal from "@clerk/nextjs";
import * as ClerkMock from "@/components/OfflineAuth";

console.log("DIAGNOSTIC - NEXT_PUBLIC_MOCK_AUTH value is:", process.env.NEXT_PUBLIC_MOCK_AUTH);
const useMock = process.env.NEXT_PUBLIC_MOCK_AUTH === 'true';

export const ClerkProvider = useMock ? ClerkMock.MockClerkProvider : ClerkReal.ClerkProvider;
export const useUser = useMock ? ClerkMock.useMockUser : ClerkReal.useUser;
export const useAuth = useMock ? ClerkMock.useMockAuth : ClerkReal.useAuth;
export const Show = useMock ? ClerkMock.MockShow : ClerkReal.Show;
export const UserButton = useMock ? ClerkMock.MockUserButton : ClerkReal.UserButton;
export const SignIn = useMock ? ClerkMock.MockSignIn : ClerkReal.SignIn;
export const SignUp = useMock ? ClerkMock.MockSignUp : ClerkReal.SignUp;
