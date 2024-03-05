// context.tsx
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";

interface emoji {
  character: string;
  codePoint: string;
  group: string;
  slug: string;
  unicodeName: string;
  subgroup: string;
}

interface AppContextProps {
  emojis: emoji[];
  loading: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export const AppContext = React.createContext<AppContextProps | undefined>(
  undefined
);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [emojis, setEmojis] = useState<emoji[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openEmojiURL = "https://emoji-api.com/emojis?";
  const accessKey = "access_key=3b76ea2378d4d6cae0b82e7446df6437707bdb4a";

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "GET",
        url,
      });

      const arrayCopy = [...data];
      let temp;

      // Fisher-Yates shuffle algorithm
      for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements using a temporary variable
        temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
      }

      const slicedArray = arrayCopy.slice(0, arrayCopy.length - 1);
      setEmojis(slicedArray);
    } catch (error) {
      console.log("error while fetching data", error);
      setEmojis([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(`${openEmojiURL}${accessKey}`);
  }, []);

  useEffect(() => {
    const url = searchTerm
      ? `${openEmojiURL}search=${searchTerm}&${accessKey}`
      : `${openEmojiURL}${accessKey}`;
    fetchData(url);
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ emojis, loading, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
