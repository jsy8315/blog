import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GithubProviderClientId, 
      clientSecret: process.env.GithubProviderClientSecret, 
    }),
  ],
  secret: process.env.GithubSecret, 
  callbacks: {
    async signIn({ user }) {
      // 허용된 GitHub 이메일 주소를 배열로 지정
      const allowedEmails = [process.env.GithubAllowedEmails]; // 관리자 github 이메일

      // 이메일이 허용된 목록에 있으면 로그인 허용
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }

      // 허용되지 않은 경우 로그인 거부
      return false;
    },
  },
};

export default NextAuth(authOptions);