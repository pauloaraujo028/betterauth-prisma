const VisualPanel = () => {
  const isLogin = null;

  return (
    <div className="relative w-full h-full flex flex-col justify-center p-16 text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('https://picsum.photos/1200/1200?grayscale&blur=2&random=${isLogin ? 1 : 2}')`,
        }}
      />
      <div className="absolute inset-0 z-10 bg-indigo-600/40 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

      <div className="relative z-20 max-w-lg">
        <div className="mb-8 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 bg-indigo-600 rounded-sm transform rotate-45" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Empresa</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
          {isLogin
            ? "Bem-vindo de volta ao futuro da gestão."
            : "Comece sua jornada rumo à eficiência."}
        </h2>

        <p className="text-lg text-slate-200 mb-10 leading-relaxed">
          {isLogin
            ? "Acesse suas ferramentas, analise seus dados e colabore com sua equipe em tempo real, de qualquer lugar do mundo."
            : "Junte-se a mais de 50.000 profissionais que já transformaram seus fluxos de trabalho com nossa plataforma SaaS inteligente."}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <svg
              className="w-5 h-5 text-indigo-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm font-medium">Feature 1</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
            <svg
              className="w-5 h-5 text-indigo-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm font-medium">Feature 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualPanel;
