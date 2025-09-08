import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const page = () => {
    return (
        <div>
            <SignedOut />
        </div>
    );
};

export default page;
