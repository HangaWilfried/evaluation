import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", () => {
  const loginUsingLinkedinAuthProvider = () => {
    const uuid = Math.random().toString(36).substring(2, 15);
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const scope = encodeURIComponent(import.meta.env.VITE_LINKEDIN_SCOOPES);
    // eslint-disable-next-line vue/max-len
    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
    );
    localStorage.setItem("linkedin_connexion_ref", uuid);
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${uuid}`;
    window.location.href = authorizationUrl;
  };

  const doLoginWithLinkedinCredentials = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const storedState = localStorage.getItem("linkedin_connexion_ref");

    if (state !== storedState) {
      console.error("State mismatch. Potential CSRF attack.");
      return;
    }

    try {
      await Promise.resolve(() => {
        console.log(code);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const doLoginWithGoogleCredentials = async (): Promise<void> => {
    try {
      await Promise.resolve(() => {
        const token = localStorage.getItem("google_token_ref");
        console.log(token);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loginUsingLinkedinAuthProvider,
    doLoginWithLinkedinCredentials,
    doLoginWithGoogleCredentials,
  };
});
