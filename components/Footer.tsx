export default function Footer() {
  return (
    <footer className="relative z-10 py-8 text-center border-t border-white/10">
      <p className="text-white/30 text-sm">
        Built with ❤️ by <span className="text-violet-400 font-medium">Ega Surya Saputra</span> · ©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
