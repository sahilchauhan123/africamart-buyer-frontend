import MobileHome from './components/MobileHome';
import DesktopHome from './components/DesktopHome';

export default function Home() {
  return (
    <main>
      <div className="lg:hidden">
        <MobileHome />
      </div>
      <div className="hidden lg:block">
        <DesktopHome />
      </div>
    </main>
  );
}
