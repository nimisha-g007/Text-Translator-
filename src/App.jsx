import { useState, useEffect } from "react";
import axios from "axios";
import { LoaderCircle, ArrowDownUp } from "lucide-react";
import { supabase } from "./supabase";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [totalTranslations, setTotalTranslations] = useState(null);

  useEffect(() => {
    supabase
      .from("app_views")
      .insert({})
      .then(({ error }) => {
        if (error) console.error("Analytics log failed:", error);
      });

    supabase
      .from("translations")
      .select("*", { count: "exact", head: true })
      .then(({ count, error }) => {
        if (!error) setTotalTranslations(count);
      });
  }, []);

  const handleSwap = () => {
    if (!result) return;
    setTextInput(result);
    setResult(textInput);
  };

  const handleClear = () => {
    setTextInput("");
    setResult("");
    setError("");
  };

  const handleTextTranslation = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: textInput,
            langpair: `autodetect|${selectValue}`,
          },
        },
      );
      setResult(response?.data?.responseData?.translatedText);
      supabase
        .from("translations")
        .insert({ target_language: selectValue })
        .then(({ error }) => {
          if (error) console.error("Analytics log failed:", error);
        });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "#eef2ef" }}
    >
      <div className="flex items-center justify-center gap-y-8 flex-col w-full max-w-[500px] py-10 px-4">
        <div className="flex flex-col items-center gap-1">
          <h1
            className="text-2xl sm:text-3xl font-semibold"
            style={{ color: "#1f342b" }}
          >
            Text Translator
          </h1>
          {totalTranslations !== null && (
            <p className="text-xs" style={{ color: "#8a9a90" }}>
              {totalTranslations.toLocaleString()} translations and counting
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-y-3 flex-col w-full">
          <textarea
            name="input-text"
            placeholder="Enter your text here"
            className="h-32 w-full outline-none rounded-lg text-base sm:text-lg px-3 py-3 transition-colors"
            style={{
              background: "#ffffff",
              border: "1px solid #033d14ff",
              color: "#1f342b",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b6a52")}
            onBlur={(e) => (e.target.style.borderColor = "#c9d6cd")}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <button
            onClick={handleSwap}
            disabled={!result}
            title="Swap text"
            className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#ffffff", border: "1px solid #03511bff" }}
          >
            <ArrowDownUp size={17} style={{ color: "#000c04ff" }} />
          </button>

          <textarea
            name="output-text"
            placeholder="Translated text"
            className="h-32 w-full outline-none rounded-lg text-base sm:text-lg px-3 py-3"
            style={{
              background: "#f5f8f6",
              border: "1px solid #044c1aff",
              color: "#1f342b",
            }}
            value={result}
            readOnly
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center sm:justify-center gap-2">
          <label
            htmlFor="options"
            className="text-sm sm:text-base"
            style={{ color: "#5c6e64" }}
          >
            Convert Into :
          </label>
          <select
            name="value"
            className="px-3 py-1.5 rounded-lg outline-none cursor-pointer w-full sm:w-auto transition-colors"
            style={{
              background: "#ffffff",
              border: "1px solid #c9d6cd",
              color: "#1f342b",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "#3b6a52")}
            onMouseLeave={(e) => (e.target.style.borderColor = "#c9d6cd")}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">Select</option>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="es">Spanish</option>
            <option value="sv">Swedish</option>
            <option value="th">Thai</option>
            <option value="tr">Turkish</option>
            <option value="sr">Serbian</option>
            <option value="ru">Russian</option>
            <option value="vi">Vietnamese</option>
            <option value="ko">Korean</option>
            <option value="zh">Chinese</option>
            <option value="ne">Nepali</option>
          </select>
        </div>

        {error && (
          <p className="text-sm" style={{ color: "#b5592f" }}>
            {error}
          </p>
        )}

        <div className="w-full flex gap-2">
          <button
            className="py-2 px-5 rounded-lg cursor-pointer transition-colors font-medium"
            style={{
              background: "#ffffff",
              border: "1px solid #c9d6cd",
              color: "#3b6a52",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#3b6a52")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#c9d6cd")
            }
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            className="flex-1 py-2 rounded-lg cursor-pointer transition-colors
              flex items-center justify-center font-medium"
            style={{ background: "#3b6a52", color: "#ffffff" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2f5642")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#3b6a52")}
            onClick={handleTextTranslation}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Translate"}
          </button>
        </div>
      </div>
    </div>
  );
}
