const GradientsBg = ({ className }: { className: String }) => {
  return (
    <div className={`w-full h-full ${className} transform scale-105`}>
      <svg className={`absolute inset-0 w-full h-full`} viewBox="0 0 393 852" fill="none">
        <g opacity="0.18" filter="url(#filter0_f_2002_181)">
          <ellipse cx="70" cy="298.5" rx="316" ry="329.5" fill="url(#paint0_radial_2002_181)" />
        </g>
        <defs>
          <filter id="filter0_f_2002_181" x="-546" y="-331" width="1232" height="1259" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2002_181" />
          </filter>
          <radialGradient id="paint0_radial_2002_181" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(70 298.5) rotate(90) scale(329.5 316)">
            <stop stopColor="#FF3232" />
            <stop offset="1" stopColor="#FF6032" />
          </radialGradient>
        </defs>
      </svg>
      <svg className={`absolute inset-0 w-full h-full`} viewBox="0 0 393 814" fill="none">
        <g filter="url(#filter0_f_2002_180)">
          <ellipse cx="414" cy="568.5" rx="257" ry="268.5" fill="url(#paint0_radial_2002_180)" />
        </g>
        <defs>
          <filter id="filter0_f_2002_180" x="-143" y="0" width="1114" height="1137" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2002_180" />
          </filter>
          <radialGradient id="paint0_radial_2002_180" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(414 568.5) rotate(90) scale(268.5 257)">
            <stop stopColor="#FF3232" />
            <stop offset="1" stopColor="#FF6032" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

export { GradientsBg }