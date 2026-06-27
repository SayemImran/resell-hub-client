export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
      {/* Background soft blurs to match your theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 bg-blue-100/30 rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 right-0 w-3/4 h-3/4 bg-purple-100/30 rounded-full blur-[150px]" />
      </div>

      <div className="flex flex-col items-center z-10 space-y-6">
        {/* Animated Custom Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-pulse" />
          
          {/* Inner spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-500 animate-spin" />
          
          {/* Center brand dot */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 flex items-center justify-center shadow-md">
            <span className="text-[10px] font-bold text-white tracking-wider">RH</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 tracking-wide animate-pulse">
            Loading...
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Bringing you the best pre-loved deals
          </p>
        </div>
      </div>
    </div>
  );
}