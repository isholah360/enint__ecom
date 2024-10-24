
import Hero from "../compoent/hero";
import AdImage from "@/compoent/adImage";
import LatestPro from "@/compoent/latestPro";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <div>
          <Hero/>
          <AdImage/>
          <h2 style={{padding:"1rem 5%", fontSize:"2rem"}}>Latest Products</h2>
          <LatestPro/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       footer
      </footer>
    </div>
  );
}
