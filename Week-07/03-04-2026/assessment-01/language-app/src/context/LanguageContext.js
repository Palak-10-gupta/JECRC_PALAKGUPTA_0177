import React, { createContext, useContext, useState } from "react";
import translations from "../translations/translations";

export const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇬🇧", native: "English"  },
  { code: "hi", label: "Hindi",    flag: "🇮🇳", native: "हिन्दी"   },
  { code: "fr", label: "French",   flag: "🇫🇷", native: "Français" },
  { code: "ja", label: "Japanese", flag: "🇯🇵", native: "日本語"   },
  { code: "es", label: "Spanish",  flag: "🇪🇸", native: "Español"  },
  { code: "ta", label: "Tamil",    flag: "🇮🇳", native: "தமிழ்"    },
  { code: "kn", label: "Kannada",  flag: "🇮🇳", native: "ಕನ್ನಡ"    },
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (key) => translations[language]?.[key] || translations["en"][key] || key;

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLang, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);