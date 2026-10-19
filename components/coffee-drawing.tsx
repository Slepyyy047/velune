/** Original line illustrations. Decorative and resolution-independent. */
export function CoffeeDrawing({ kind = "cup", className = "" }: { kind?: "cup" | "beans" | "filter"; className?: string }) {
  return <svg className={`coffee-drawing ${className}`} viewBox="0 0 360 320" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === "cup" ? <>
      <path className="drawing-fill" d="M72 128Q178 102 276 130L257 226Q179 269 92 225Z"/>
      <path d="M72 128Q78 197 92 225Q168 273 257 226L276 130 M73 129C74 94 274 93 276 130C274 165 75 166 73 129Z"/>
      <path d="M85 129C95 107 251 107 263 130C245 151 104 153 85 129Z M107 124Q171 108 239 125 M280 139Q329 125 326 171Q320 205 264 207 M278 151Q313 143 311 168Q307 186 269 192"/>
      <path d="M84 223C16 248 61 288 177 288C298 288 337 252 260 226 M69 265Q173 300 293 263 M123 153Q136 180 142 215"/>
      <path className="drawing-steam" d="M139 80C115 53 157 44 142 18 M181 76C166 54 196 38 185 14 M220 83C205 63 233 48 222 29"/>
      <path d="M50 288L38 294 M310 279L321 284 M45 118L33 112"/>
    </> : kind === "beans" ? <>
      <g transform="translate(88 92) rotate(-28)"><path className="drawing-fill" d="M-28-39C-64-13-44 49-9 52C25 59 57 12 42-22C29-50-5-57-28-39Z"/><path d="M-28-39C-64-13-44 49-9 52C25 59 57 12 42-22C29-50-5-57-28-39Z M18-40C-18-17 20 3-17 43 M24-31C-3-9 18 10-10 37 M-31-19L-35-6 M28 12L22 26"/></g>
      <g transform="translate(244 114) rotate(28)"><path className="drawing-fill" d="M-26-44C-68-22-50 40-17 51C20 65 57 24 47-15C40-45 5-57-26-44Z"/><path d="M-26-44C-68-22-50 40-17 51C20 65 57 24 47-15C40-45 5-57-26-44Z M17-43C-19-13 19 4-16 42 M24-34C-1-13 14 10-8 37 M-35-14L-35 2 M30 16L22 30"/></g>
      <g transform="translate(166 241) rotate(55)"><path className="drawing-fill" d="M-25-40C-62-18-47 43-10 49C27 53 55 12 42-21C31-47 3-54-25-40Z"/><path d="M-25-40C-62-18-47 43-10 49C27 53 55 12 42-21C31-47 3-54-25-40Z M16-39C-18-16 17 2-16 41 M23-31C-2-12 14 9-9 35"/></g>
      <path d="M140 73L150 65 M45 190L37 198 M291 224L303 229 M276 251L280 260"/>
    </> : <>
      <path className="drawing-fill" d="M77 83H278L211 211H145Z"/>
      <path d="M77 83H278L211 211H145Z M98 96L152 198 M130 96L165 198 M166 96L177 198 M202 96L191 198 M238 96L204 198 M145 211H211 M173 214V240 M184 216V239"/>
      <path d="M116 248H242L231 291Q179 310 127 289Z M244 254H264Q282 274 237 282 M106 306H251 M91 83C94 61 271 61 278 83"/>
      <path d="M257 25Q303 27 308 51L274 69 M211 13L252 26 M202 19L241 33 M260 32L276 42"/>
    </>}
  </svg>;
}
