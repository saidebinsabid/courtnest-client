import axios from "axios";

const useSaveUser = () => {
  const saveUser = async (user) => {
    if (!user?.email) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: user.displayName || "No Name",
        email: user.email,
        photoURL: user.photoURL || "",
      });
      return res.data;
    } catch (error) {
      console.error("Error saving user to DB:", error);
      throw error;
    }
  };

  return saveUser;
};

export default useSaveUser;
