import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState(null);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (characters) str += "!@#$%^&*()~`{}?/-=+.,";
    
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, characters]);

  const selectPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, characters, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto my-14 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(255,165,0,0.5)] border border-orange-600">
        <h1 className="mb-8 text-3xl font-extrabold tracking-wide text-center text-orange-400 drop-shadow-lg">
          🔐 Password Generator
        </h1>

        <div className="flex items-center gap-4 p-5 bg-gray-900 border border-orange-500 shadow-inner rounded-2xl">
          <input
            type="text"
            value={password || ""}
            readOnly
            ref={passwordRef}
            placeholder="Your password"
            className="flex-grow px-5 py-3 text-lg font-semibold text-orange-400 placeholder-orange-300 bg-transparent rounded-lg shadow-sm outline-none selection:bg-orange-600 selection:text-gray-900"
          />
          <button
            onClick={selectPassword}
            className="px-6 py-3 text-sm font-semibold text-white transition-transform duration-150 bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2"
            aria-label="Copy password"
          >
            Copy
          </button>
        </div>

        <form className="mt-8 space-y-6 text-orange-400">
          {/* Length Slider */}
          <div className="flex flex-col">
            <label htmlFor="lengthRange" className="mb-2 text-lg font-semibold select-none">
              Length: <span className="text-orange-300">{length}</span>
            </label>
            <input
              id="lengthRange"
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full transition-colors cursor-pointer accent-orange-500 hover:accent-orange-600"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex justify-center gap-6">
            <label htmlFor="numberInput" className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="numberInput"
                type="checkbox"
                checked={number}
                onChange={() => setNumber((prev) => !prev)}
                className="w-5 h-5 transition-colors accent-orange-500 hover:accent-orange-600"
              />
              <span className="text-lg font-semibold">Numbers</span>
            </label>

            <label htmlFor="characterInput" className="flex items-center gap-2 cursor-pointer select-none">
              <input
                id="characterInput"
                type="checkbox"
                checked={characters}
                onChange={() => setCharacters((prev) => !prev)}
                className="w-5 h-5 transition-colors accent-orange-500 hover:accent-orange-600"
              />
              <span className="text-lg font-semibold">Characters</span>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
