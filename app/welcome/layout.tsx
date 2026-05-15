

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Optional: Header specific to welcome pages */}
      <header >
      
      </header>

      <main className="flex-1 w-full max-w-4xl p-4">
        {children}  
        
      </main>

    
    </div>
  );
}
