import { SignInComponent } from "@/components/sign-in";
import { SignUpComponent } from "@/components/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FC } from "react";

const Page: FC = () => (
	<main className="h-full w-full flex">
		<Tabs defaultValue="signIn" className="mx-auto mt-16 w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="signIn">Sign In</TabsTrigger>
				<TabsTrigger value="signUp">Sign Up</TabsTrigger>
			</TabsList>
			<TabsContent value="signIn">
				<SignInComponent />
			</TabsContent>
			<TabsContent value="signUp">
				<SignUpComponent />
			</TabsContent>
		</Tabs>
	</main>
);

export default Page;
