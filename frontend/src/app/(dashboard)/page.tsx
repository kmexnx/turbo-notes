import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-brand-text mb-4">
        Welcome to Turbo Notes!
      </h1>
      
      <p className="text-lg text-gray-700 mb-8">
        Your personal note-taking app powered by Turbo.
      </p>

      {/* Test Tailwind Custom Colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-brand-text mb-4">
          Tailwind Config Test:
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-brand-orange text-white text-center">
            <p className="font-semibold">Orange</p>
            <p className="text-sm">#EF9C66</p>
          </div>
          
          <div className="p-6 rounded-xl bg-brand-yellow text-brand-text text-center">
            <p className="font-semibold">Yellow</p>
            <p className="text-sm">#FCDC94</p>
          </div>
          
          <div className="p-6 rounded-xl bg-brand-green text-white text-center">
            <p className="font-semibold">Green</p>
            <p className="text-sm">#C8CFA0</p>
          </div>
          
          <div className="p-6 rounded-xl bg-brand-teal text-white text-center">
            <p className="font-semibold">Teal</p>
            <p className="text-sm">#78ABA8</p>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-xl bg-white border border-gray-200">
          <p className="text-brand-text">
            ✅ If you see the colors above, your Tailwind config is working correctly!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Background color is using: <code className="bg-gray-100 px-2 py-1 rounded">bg-background (#FDFCF8)</code>
          </p>
        </div>
      </div>
    </div>
  );
}
