import axios from "axios";

export const getCountryCode = async () => {
  try {
    const response = await axios.get("http://ip-api.com/json/");
    return response.data.countryCode.toLowerCase();
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "us"; // Default to 'us' if there's an error
  }
};
