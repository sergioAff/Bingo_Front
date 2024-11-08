export default function Footer({ font }: { font: string }) {
  return (
    <footer
      className={`bg-white/25 text-white py-4 ${font} flex items-center justify-center z-10`}
    >
      <h1>Footer</h1>
    </footer>
  );
}
