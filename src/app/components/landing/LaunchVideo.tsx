import { SiteLinks } from '@/app/models/links';
import { YoutubeVideo } from '../YoutubeVideo';

export default function LaunchVideo() {
  return (
    <div className="container">
      <h1 className="mb-16 text-center text-3xl text-[2.7rem] text-white">TEASER</h1>

      <div className="container mb-72 flex justify-center align-middle">
        <YoutubeVideo src={SiteLinks.launchVideoV2} height={400} />
      </div>
    </div>
  );
}
